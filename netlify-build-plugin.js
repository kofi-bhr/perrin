// Custom Netlify build plugin to install Python distutils
module.exports = {
  onPreBuild: async ({ utils }) => {
    try {
      console.log('Installing Python distutils...');
      await utils.run.command('apt-get update && apt-get install -y python3-distutils');
      console.log('Python distutils installed successfully');
    } catch (error) {
      console.error('Error installing Python distutils:', error);
      // Don't fail the build if this doesn't work
    }
  }
}; 