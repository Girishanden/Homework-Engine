class Console {
				constructor() {
					this.isOpen = false;
					this.consoleMessages = [];

					// Styles
					this.styles = $(`
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
    `);

					// Console
					this.consoleElement = $(`
      <div class="console-container closed">
        <div class="console-header">
          <span>Console</span>
          <button class="console-toggle">Toggle</button>
        </div>
        <input type="text" class="console-input" placeholder="Enter command..." />
        <div class="console-content">
          
        </div>
      </div>
    `);

					// Append to body
					$('body').append(this.styles);
					$('body').append(this.consoleElement);

					// Event listeners
					this.consoleElement.find('.console-header').on('click', () => {
						this.toggleConsole();
					});
					this.consoleElement.find('.console-input').on('keypress', (e) => {
						if (e.which === 13) {
							this.executeCommand();
						}
					});

					// Redefine console methods
					this.redefineConsoleMethods();
				}

				toggleConsole() {
					this.isOpen = !this.isOpen;
					this.consoleElement.toggleClass('closed', !this.isOpen);
					this.consoleElement.toggleClass('open', this.isOpen);
				}

				executeCommand() {
					const input = this.consoleElement.find('.console-input').val();
					this.consoleElement.find('.console-input').val('');
					this.log(`> ${input}`);

					try {
						const result = eval(input);
						this.log(result);
					} catch (e) {
						this.error(`Error: ${e.message}`);
					}
				}

				redefineConsoleMethods() {
					const that = this;

					console.log = function(...args) {
						that.log(...args);
					};

					console.warn = function(...args) {
						that.warn(...args);
					};

					console.error = function(...args) {
						that.error(...args);
					};

					console.debug = function(...args) {
						that.debug(...args);
					};
				}

				log(...args) {
					this.addMessage('log', ...args);
				}

				warn(...args) {
					this.addMessage('warn', ...args);
				}

				error(...args) {
					this.addMessage('error', ...args);
				}

				debug(...args) {
					this.addMessage('debug', ...args);
				}

				addMessage(type, ...args) {
					const message = this.formatMessage(type, ...args);
					this.consoleMessages.push(message);
					this.updateConsoleContent();
				}

				formatMessage(type, ...args) {
					const formattedArgs = args.map((arg) => {
						if (typeof arg === 'object') {
							return JSON.stringify(arg);
						} else {
							return arg;
						}
					}).join(' ');

					return `<div class="console-message ${type}">${type.toUpperCase()}: ${formattedArgs}</div>`;
				}

				updateConsoleContent() {
					this.consoleElement.find('.console-content').html("<br>"+this.consoleMessages.join(''));
				}
			}

			// Usage
			const myConsole = new Console();
