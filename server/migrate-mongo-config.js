// Replace 'module.exports' with 'export default'

export default {
  mongodb: {
    url: 'mongodb+srv://wafa:randompass@cluster0.108rh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    databaseName: 'taskManager',

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },

  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
};
