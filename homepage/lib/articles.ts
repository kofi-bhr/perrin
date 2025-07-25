export interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  excerpt: string;
  category: string | string[]; // Support both single and multiple categories for backward compatibility
  type: 'news' | 'opinion';
  authorName?: string;
  authorPosition?: string;
  date: string;
  image: string;
  imageSource?: string; // Credit for the image source
  featured: boolean;
}

// Client-side function to get all articles
export async function getArticles(): Promise<Article[]> {
  try {
    const response = await fetch('/api/articles', { 
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

// Client-side function to add a new article
export async function addArticle(article: Omit<Article, "id">): Promise<Article | null> {
  try {
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create article');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating article:', error);
    return null;
  }
}

// Client-side function to update an existing article
export async function updateArticle(id: string, article: Partial<Article>): Promise<Article | null> {
  try {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update article');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating article:', error);
    return null;
  }
}

// Client-side function to get an article by ID
export async function getArticleById(id: string): Promise<Article | null> {
  try {
    // Fetch directly from the API endpoint for the specific article
    const response = await fetch(`/api/articles/${id}`, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      // Fall back to the old method if direct fetch fails
      const articles = await getArticles();
      return articles.find(article => article.id === id) || null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching article by ID:', error);
    // Fall back to the old method
    try {
      const articles = await getArticles();
      return articles.find(article => article.id === id) || null;
    } catch (fallbackError) {
      console.error('Error in fallback method:', fallbackError);
      return null;
    }
  }
}

// Client-side function to get articles by category
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const articles = await getArticles();
    return articles.filter(article => article.category === category);
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

// Client-side function to delete an article
export async function deleteArticle(id: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete article');
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
} 