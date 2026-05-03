#pragma once

#include <crow.h>

namespace http_response
{
    inline crow::response Json(int statusCode, const crow::json::wvalue& body)
    {
        crow::response response(statusCode);
        response.set_header("Content-Type", "application/json");
        response.body = body.dump();
        return response;
    }

    inline crow::response Ok(const crow::json::wvalue& body)
    {
        return Json(200, body);
    }

    inline crow::response Error(int statusCode, const std::string& message)
    {
        crow::json::wvalue body;
        body["success"] = false;
        body["message"] = message;

        return Json(statusCode, body);
    }
}