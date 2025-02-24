#!/bin/bash
startClient() {
    cd client || exit 1
    npm run dev
}
startServer() {
    gnome-terminal -- bash -c "cd backend && npm run dev; exec bash"
}
startClient &
startServer
wait
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

