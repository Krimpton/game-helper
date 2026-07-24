const API_URL = "http://localhost:3000/api/chat";


// GET CHAT MESSAGES

export async function getChatMessages() {


  const response = await fetch(
    `${API_URL}/messages`
  );


  const data = await response.json();



  if (!response.ok) {

    throw new Error(
      data.message || "Failed to load messages"
    );

  }


  return data;

}



// SEND CHAT MESSAGE

export async function sendChatMessage(
  username:string,
  message:string
) {


  const response = await fetch(
    `${API_URL}/messages`,
    {

      method:"POST",

      headers:{

        "Content-Type":"application/json",

      },


      body: JSON.stringify({

        username,

        message,

      }),

    }
  );



  const data = await response.json();



  if(!response.ok){

    throw new Error(
      data.message || "Failed to send message"
    );

  }



  return data.chatMessage;

}