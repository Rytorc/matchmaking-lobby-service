#include <crow.h>

#include "config/AppConfig.hpp"
#include "utils/HttpResponse.hpp"

int main()
{
    AppConfig config = AppConfig::Load();

    crow::SimpleApp app;

    CROW_ROUTE(app, "/api/health")
    .methods(crow::HTTPMethod::GET)
    ([]()
    {
        crow::json::wvalue body;
        body["success"] = true;
        body["service"] = "matchmaking-lobby-service";
        body["status"] = "ok";
        body["version"] = "0.1.0";

        return http_response::Ok(body);
    });

    CROW_ROUTE(app, "/api")
    .methods(crow::HTTPMethod::GET)
    ([]()
    {
        crow::json::wvalue body;
        body["success"] = true;
        body["message"] = "Matchmaking Lobby API is running";

        return http_response::Ok(body);
    });

    CROW_LOG_INFO << "Starting Matchmaking Lobby Backend";
    CROW_LOG_INFO << "Environment: " << config.environment;
    CROW_LOG_INFO << "Port: " << config.port;

    app.port(config.port)
        .multithreaded()
        .run();

    return 0;
}