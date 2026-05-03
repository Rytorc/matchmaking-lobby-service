FROM ubuntu:24.04 AS build

RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    libasio-dev \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --depth 1 https://github.com/CrowCpp/Crow.git /tmp/crow && \
    cmake -S /tmp/crow -B /tmp/crow/build \
        -DCROW_BUILD_EXAMPLES=OFF \
        -DCROW_BUILD_TESTS=OFF && \
    cmake --build /tmp/crow/build && \
    cmake --install /tmp/crow/build

WORKDIR /app

COPY . .

RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release && \
    cmake --build build

FROM ubuntu:24.04

WORKDIR /app

COPY --from=build /app/build/matchmaking_backend /app/matchmaking_backend

EXPOSE 8080

CMD ["./matchmaking_backend"]