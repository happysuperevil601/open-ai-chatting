import user from '../../img/user.svg';
import bot from '../../img/bot.svg';

const chatUI = (isAi, value, uniqueId) => {
    return (
        `
          <div class="wrapper ${isAi && 'ai'}">
              <div class="chat">
                  
                  <div class="profile">
                      <img 
                        src=${isAi ? bot : user} 
                        alt="${isAi ? 'bot' : 'user'}" 
                      />
                  </div>

                  <div class="message" id=${uniqueId}>${value}</div>
                  
              </div>
          </div>
      `
    )
}

export default chatUI;