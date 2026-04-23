require('dotenv').config();
const app = require('./app');

// 🔹 Port
const PORT = process.env.PORT || 3000;

// 🔹 Start Server
const startServer = () => {
  try {
    const server = app.listen(PORT, () => {
      console.log(`🍽️ Cafe API running at http://localhost:${PORT}`);
    });

    // Graceful shutdown handling
    const shutdown = () => {
      console.log('🛑 Shutting down server...');
      server.close(() => {
        console.log('✅ Server closed gracefully');
        process.exit(0);
      });
    };

    // Handle termination signals
    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();

// 🔹 Global Error Handlers
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  process.exit(1);
});