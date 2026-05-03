#include <crow.h>

#include "config/AppConfig.hpp"
#include "utils/HttpResponse.hpp"

struct CorsMiddleware
{
    struct context
    {
    };

    void before_middleware(crow::request& request, crow::response& response, context&)
    {
        if(request.method == crow::HTTPMethod::OPTIONS)
        {
            response.code = 204;
            response.set_header("Access-Control-Allow-Origin", "http://localhost:5173");
            response.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization");
            response.end();
        }
    }

    void after_handle(crow::request&, crow::response& response, context&)
    {
        response.set_header("Access-Control-Allow-Origin", "http://localhost:5173");
        response.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.set_header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }
};

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