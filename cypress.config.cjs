const { defineConfig } = require("cypress")
require("dotenv").config()

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "reports/mochawesome",
    overwrite: false,
    html: true,
    json: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    charts: true,
  },
  e2e: {
    baseUrl: process.env.BASE_URL || "https://aprende-ba-staging.up.railway.app/login",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    viewportWidth: 1280,
    experimentalStudio: true,
    viewportHeight: 800,
    chromeWebSecurity: false,
    experimentalRunAllSpecs: true,
    testIsolation: true,
    video: true,
    screenshotsFolder: "screenshots",
    videosFolder: "videos",
    retries: {
      runMode: 1,
      openMode: 0,
    },
    env: {
      GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
      GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
    },
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on)
      on("before:browser:launch", (browser = {}, launchOptions) => {
        const path = require("path")
        const isHeadless = Boolean(browser.isHeadless)
        
        if (browser.family === "chromium" && browser.name === "chrome") {
          // Persistent profile for Chrome
          const profileDir = path.resolve(__dirname, ".chrome-profile")
          
          // Remove ALL automation indicators
          const args = launchOptions.args.filter(arg => 
            !arg.startsWith("--enable-automation") && 
            !arg.includes("--test-type")
          )
          
          // Core stealth arguments
          args.push(`--user-data-dir=${profileDir}`)
          args.push("--disable-blink-features=AutomationControlled")
          args.push("--exclude-switches=enable-automation")
          args.push("--disable-features=site-per-process,IsolateOrigins,CrossSiteDocumentBlockingIfIsolating")
          args.push("--flag-switches-begin")
          args.push("--disable-site-isolation-trials")
          args.push("--flag-switches-end")
          args.push("--disable-dev-shm-usage")
          args.push("--no-sandbox")
          args.push("--disable-setuid-sandbox")
          args.push("--disable-web-security")
          args.push("--allow-running-insecure-content")
          args.push("--disable-features=IsolateOrigins,site-per-process,BlockInsecurePrivateNetworkRequests")
          args.push("--disable-blink-features")
          
          // Mimic real browser
          args.push("--no-first-run")
          args.push("--no-default-browser-check")
          args.push("--disable-popup-blocking")
          args.push("--disable-prompt-on-repost")
          args.push("--disable-background-timer-throttling")
          args.push("--disable-renderer-backgrounding")
          args.push("--disable-backgrounding-occluded-windows")
          args.push("--disable-features=TranslateUI")
          args.push("--disable-ipc-flooding-protection")
          
          if (isHeadless) {
            // Use old headless mode which is less detectable
            args.push("--headless=chrome")
            args.push("--window-size=1920,1080")
            args.push("--start-maximized")
          } else {
            args.push("--start-maximized")
            args.push("--window-size=1920,1080")
          }
          
          // Spoof user agent
          const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
          args.push(`--user-agent=${ua}`)
          
          // Additional preferences
          launchOptions.args = args
          launchOptions.preferences = {
            ...launchOptions.preferences,
            "credentials_enable_service": false,
            "profile": {
              "password_manager_enabled": false
            }
          }
        } else if (browser.family === "firefox") {
          const profileDir = path.resolve(__dirname, ".firefox-profile")
          launchOptions.args.push("-profile", profileDir)
          launchOptions.args.push("--width=1280", "--height=800")
          launchOptions.preferences = {
            ...(launchOptions.preferences || {}),
            "dom.webdriver.enabled": false,
            "useAutomationExtension": false,
            "media.navigator.enabled": true,
            "toolkit.telemetry.reportingpolicy.firstRun": false,
            "browser.shell.checkDefaultBrowser": false,
            "browser.cache.disk.enable": false,
          }
        }
        return launchOptions
      })
      
      // Inject script to remove webdriver property
      on("task", {
        removeWebdriverProperty() {
          // This would be executed in Node context
          return null
        }
      })
      
      return config
    },
  },
})