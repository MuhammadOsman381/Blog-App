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



AIzaSyA5URFbJlN9qFZMgzVhWOlnlgMzlJ7nsS8



if (text.startsWith("```") && text.endsWith("```")) {
      const code = text.slice(3, -3).trim();
      return (
        <SyntaxHighlighter language="javascript" style={tomorrow}>
          {code}
        </SyntaxHighlighter>
      );
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

