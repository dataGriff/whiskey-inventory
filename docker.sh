#!/bin/bash

# Whiskey Inventory Docker Compose Helper Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check if Docker is running
check_docker() {
    if ! docker info >/dev/null 2>&1; then
        print_message $RED "Error: Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to check if docker-compose is available
check_docker_compose() {
    if ! command -v docker-compose >/dev/null 2>&1 && ! docker compose version >/dev/null 2>&1; then
        print_message $RED "Error: Neither 'docker-compose' nor 'docker compose' is available."
        exit 1
    fi
}

# Function to get docker compose command
get_docker_compose_cmd() {
    if command -v docker-compose >/dev/null 2>&1; then
        echo "docker-compose"
    else
        echo "docker compose"
    fi
}

# Function to display help
show_help() {
    echo "Whiskey Inventory Docker Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  up, start     - Start all services (default)"
    echo "  down, stop    - Stop all services"
    echo "  restart       - Restart all services"
    echo "  logs          - Show logs from all services"
    echo "  logs [service]- Show logs from specific service"
    echo "  build         - Build all images"
    echo "  clean         - Remove all containers, images, and volumes"
    echo "  status        - Show status of all services"
    echo "  shell [service] - Open shell in running service"
    echo "  help          - Show this help message"
    echo ""
    echo "Available services: postgres, migrations, backend, frontend"
    echo ""
    echo "Examples:"
    echo "  $0                    # Start all services"
    echo "  $0 up                 # Start all services"
    echo "  $0 logs backend       # Show backend logs"
    echo "  $0 shell backend      # Open shell in backend container"
    echo "  $0 clean              # Clean up everything"
}

# Check prerequisites
check_docker
check_docker_compose

# Get docker compose command
COMPOSE_CMD=$(get_docker_compose_cmd)

# Handle commands
case "${1:-up}" in
    up|start)
        print_message $BLUE "Starting Whiskey Inventory application..."
        
        # Check if .env file exists, if not copy from .env.example
        if [ ! -f .env ]; then
            print_message $YELLOW "No .env file found. Copying from .env.example..."
            cp .env.example .env
            print_message $GREEN ".env file created. You can customize it if needed."
        fi
        
        print_message $BLUE "Building and starting services..."
        $COMPOSE_CMD up --build -d
        
        print_message $GREEN "Services started successfully!"
        print_message $BLUE "Frontend: http://localhost:3000"
        print_message $BLUE "Backend API: http://localhost:3001"
        print_message $BLUE "Database: localhost:5432"
        print_message $YELLOW "Use '$0 logs' to view logs"
        ;;
    down|stop)
        print_message $BLUE "Stopping Whiskey Inventory application..."
        $COMPOSE_CMD down
        print_message $GREEN "Services stopped successfully!"
        ;;
    restart)
        print_message $BLUE "Restarting Whiskey Inventory application..."
        $COMPOSE_CMD restart
        print_message $GREEN "Services restarted successfully!"
        ;;
    logs)
        if [ -n "$2" ]; then
            print_message $BLUE "Showing logs for $2..."
            $COMPOSE_CMD logs -f "$2"
        else
            print_message $BLUE "Showing logs for all services..."
            $COMPOSE_CMD logs -f
        fi
        ;;
    build)
        print_message $BLUE "Building all images..."
        $COMPOSE_CMD build
        print_message $GREEN "All images built successfully!"
        ;;
    clean)
        print_message $YELLOW "This will remove all containers, images, and volumes. Are you sure? (y/N)"
        read -r confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            print_message $BLUE "Cleaning up..."
            $COMPOSE_CMD down -v --rmi all
            docker system prune -f
            print_message $GREEN "Cleanup completed!"
        else
            print_message $BLUE "Cleanup cancelled."
        fi
        ;;
    status)
        print_message $BLUE "Service status:"
        $COMPOSE_CMD ps
        ;;
    shell)
        if [ -n "$2" ]; then
            print_message $BLUE "Opening shell in $2..."
            $COMPOSE_CMD exec "$2" /bin/sh
        else
            print_message $RED "Please specify a service name."
            print_message $BLUE "Available services: postgres, backend, frontend"
        fi
        ;;
    help)
        show_help
        ;;
    *)
        print_message $RED "Unknown command: $1"
        show_help
        exit 1
        ;;
esac