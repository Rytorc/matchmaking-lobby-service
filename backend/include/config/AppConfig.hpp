#pragma once

#include <cstdlib>
#include <cstdint>
#include <string>

struct AppConfig
{
    std::uint16_t port = 8080;
    std::string environment = "development";

    static AppConfig Load()
    {
        AppConfig config;

        if (const char* portValue = std::getenv("APP_PORT"))
        {
            config.port = static_cast<std::uint16_t>(std::stoi(portValue));
        }

        if (const char* envValue = std::getenv("APP_ENV"))
        {
            config.environment = envValue;
        }

        return config;
    }
};