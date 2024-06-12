class Console{constructor(){this.isOpen=!1,this.consoleMessages=[],this.styles=$(`
      <style>
        .console-container {
          position: fixed;
          bottom: 0;
          width: 100%;
          background-color: #333;
          color: #fff;
          font-family: monospace;
          font-size: 14px;
          box-sizing: border-box;
          z-index: 9999;
          transition: height 0.3s ease;
        }
        .console-container.closed {
          height: 30px;
        }
        .console-container.open {
          height: 300px;
        }
        .console-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 10px;
          background-color: #444;
          cursor: pointer;
        }
        .console-content {
          padding: 10px;
          overflow-y: auto;
          max-height: 270px;
        }
        .console-input {
          background-color: black;
          border: none;
          color: #fff;
          font-family: monospace;
          font-size: 14px;
          width: 100%;
          outline: none;
          z-index:-7;
        }
        .console-message {
          margin-bottom: 5px;
          white-space: pre-wrap;
        }
        .console-message.log {
          color: #fff;
        }
        .console-message.warn {
          color: #ffcc00;
        }
        .console-message.error {
          color: #ff6666;
        }
        .console-message.debug {
          color: #00ccff;
        }
      </style>
    `),this.consoleElement=$(`
      <div class="console-container closed">
        <div class="console-header">
          <span>Console</span>
          <button class="console-toggle">Toggle</button>
        </div>
        <input type="text" class="console-input" placeholder="Enter command..." />
        <div class="console-content">
          
        </div>
      </div>
    `),$("body").append(this.styles),$("body").append(this.consoleElement),this.consoleElement.find(".console-header").on("click",()=>{this.toggleConsole()}),this.consoleElement.find(".console-input").on("keypress",e=>{13===e.which&&this.executeCommand()}),this.redefineConsoleMethods()}toggleConsole(){this.isOpen=!this.isOpen,this.consoleElement.toggleClass("closed",!this.isOpen),this.consoleElement.toggleClass("open",this.isOpen)}executeCommand(){let input=this.consoleElement.find(".console-input").val();this.consoleElement.find(".console-input").val(""),this.log(`> ${input}`);try{let result=eval(input);this.log(result)}catch(e){this.error(`Error: ${e.message}`)}}redefineConsoleMethods(){let e=this;console.log=function(...o){e.log(...o)},console.warn=function(...o){e.warn(...o)},console.error=function(...o){e.error(...o)},console.debug=function(...o){e.debug(...o)}}log(...e){this.addMessage("log",...e)}warn(...e){this.addMessage("warn",...e)}error(...e){this.addMessage("error",...e)}debug(...e){this.addMessage("debug",...e)}addMessage(e,...o){let s=this.formatMessage(e,...o);this.consoleMessages.push(s),this.updateConsoleContent()}formatMessage(e,...o){let s=o.map(e=>"object"==typeof e?JSON.stringify(e):e).join(" ");return`<div class="console-message ${e}">${e.toUpperCase()}: ${s}</div>`}updateConsoleContent(){this.consoleElement.find(".console-content").html("<br>"+this.consoleMessages.join(""))}}const myConsole=new Console;
