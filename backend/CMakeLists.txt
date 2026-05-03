cmake_minimum_required(VERSION 3.22)

project(matchmaking_lobby_backend LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_executable(matchmaking_backend
    src/main.cpp
)

target_include_directories(matchmaking_backend
    PRIVATE
        ${CMAKE_CURRENT_SOURCE_DIR}/include
)

find_package(Crow REQUIRED)

target_link_libraries(matchmaking_backend
    PRIVATE
        Crow::Crow
)

if (UNIX)
    target_link_libraries(matchmaking_backend
        PRIVATE
            pthread
    )
endif()