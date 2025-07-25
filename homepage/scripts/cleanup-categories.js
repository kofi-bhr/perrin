const { MongoClient } = require('mongodb');

const OLD_CATEGORIES = [
  "Foreign Policy", 
  "Startups", 
  "Climate Action"
];

const NEW_CATEGORY_MAPPING = {
  "Foreign Policy": "International Affairs",
  "Climate Action": "Climate",
  "Startups": "Technology"
};

async function cleanupCategories() {
  let client;
  
  try {
    // Connect to MongoDB
    client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017/perrin');
    await client.connect();
    
    const db = client.db();
    const collection = db.collection('articles');
    
    console.log('🔍 Finding articles with old categories...');
    
    // Find all articles
    const articles = await collection.find({}).toArray();
    console.log(`📄 Found ${articles.length} total articles`);
    
    let updatedCount = 0;
    
    for (const article of articles) {
      let needsUpdate = false;
      let newCategory = article.category;
      
      // Handle single category (string)
      if (typeof article.category === 'string') {
        if (OLD_CATEGORIES.includes(article.category)) {
          newCategory = NEW_CATEGORY_MAPPING[article.category] || article.category;
          needsUpdate = true;
          console.log(`📝 Updating article "${article.title}": ${article.category} → ${newCategory}`);
        }
      }
      // Handle multiple categories (array)
      else if (Array.isArray(article.category)) {
        newCategory = article.category.map(cat => {
          if (OLD_CATEGORIES.includes(cat)) {
            console.log(`📝 Updating category in "${article.title}": ${cat} → ${NEW_CATEGORY_MAPPING[cat] || cat}`);
            return NEW_CATEGORY_MAPPING[cat] || cat;
          }
          return cat;
        });
        
        // Check if any categories were actually changed
        needsUpdate = JSON.stringify(article.category) !== JSON.stringify(newCategory);
      }
      
      // Update the article if needed
      if (needsUpdate) {
        await collection.updateOne(
          { _id: article._id },
          { $set: { category: newCategory } }
        );
        updatedCount++;
      }
    }
    
    console.log(`✅ Successfully updated ${updatedCount} articles`);
    console.log('🎉 Category cleanup completed!');
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// Run the cleanup
cleanupCategories(); 