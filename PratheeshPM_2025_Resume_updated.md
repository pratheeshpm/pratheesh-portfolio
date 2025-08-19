```markdown
# Pratheesh PM
Principal Software Engineer

## Summary
I’m a passionate engineer with 12 years of experience, major contribution being building systems that are facing large scale customers. Aiming to pursue greater excellence and growth by contributing to the best of my skills and work hard to meet greater challenges in organisation.

## Technology Skills
**Programming Languages:** Typescript, Javascript, Python, Go, Rust.
**Frameworks and Libraries:** NodeJS, ExpressJS, ReactJS, LLMs, Mobx, TensorflowJS for Machine Learning and Deep Learning, FastAPI, Apache Spark, Flutter, React-Native, Unity3d for gaming etc.

## Professional Experience
**Allen Digital, India's leading Ed-tech platform**  
**Staff Software Engineer**  
**1. Content Delivery**  
**Doordarshan – Next-Gen WebRTC Video Conferencing Platform using MediaSoup (Agora Replacement):**  
- **Backend Contributions & Deep Dive:**  
  - Contributed to Go/Rust backend services, writing critical-path code for WebRTC session management and media routing  
  - Gained architectural mastery of MediaSoup's SFU design to properly implement client-side ICE negotiation and bandwidth adaptation  
  - Authored comprehensive technical documentation with flowcharts and sequence diagrams to bridge backend-client understanding  
  - Android Client (3-Tier Architecture):  
  - Solely built a POC application demonstrating end-to-end video calling using MediaSoup's C++ libraries via a three-tier architecture:  
   1. Native Layer: Directly interfaced with MediaSoup's C++ WebRTC engine  
   2. JNI Bridge: Developed a Kotlin-native SDK exposing media operations  
   3. Application Layer: Implemented signaling and UI components in Kotlin  
- Web Client: Engineered a React-based PWA with MediaSoup integration, achieving low glass-to-glass latency  
- Ploneered a high-performance, open-source virtualized bidirectional infinite scroll library for live chat platforms, enabling seamless prepend/append operations while preserving scroll position, optimizing memory usage, and ensuring battery-smooth UX for high-frequency data streams  

---

## 2. Content Platform – Next-Gen Content Management Platform
Architected Allen's flagship content platform serving 6.5K daily learners with cutting-edge performance optimizations

- **Core Platform Architecture**  
  - Built a monorepo ecosystem (TurboRepo + Vite) featuring:  
  - Universal SDK: Powers multiple template types (Flashcards, Revision Notes, PPTs, etc.) from a single data source  
  - Admin Console: Advanced content studio supporting:  
    - Creation and management of rich-media store assets  
    - Major assets include text (LaTeX supported), images, videos, 3D models, ISpring PPTs, whiteboard write-ups, mind maps, etc., and templates  
    - Capabilities to preview templates, search assets, tag and annotate rich-media assets, etc.  
- **Student-Facing App – High-Performance Content Renderer:**  
  - Engineered virtualized, animation-rich templates (Flashcards / Revision Notes / PPTs) for seamless in-app WebView & desktop experiences  
  - Cross-platform adaptive layouts and optimized memory-heavy asset rendering (e.g., 3D models) using lazy-loading  

### Breakthrough Features & Adoption Metrics
1. AI-Powered FlashCards for Students (Most Engaging Tool)  
   - 8.1K WAU | 25.2 avg cards/student
   - 25.2 Avg. Cards Consumer/Student
   - 40K+ AI-generated cards

2. Live Class Interactive Suite
   - PPT / Whiteboard / Video / 3D Model sync using Firebase
   - Teacher-controlled simulations

3. Smart Revision Notes
   - 6.5K DAU | 30 mins avg/day

**Dailyhunt, India's leading news app May 2017 - Mar 2024** Senior Software Engineer (May 2017 - April 2018), Lead Software Engineer(April 2018 - April 2019), Principal Software Engineer(April 2019 - Now)

- **text-to-movie:** Won a hackathon competition where I solo-coded a project that converted a news into a short video, rap song(using Suno's Chirp model) and memes. The project included image creating using DALL-E 3 and GPT-Vision (utilized Autogen agents to correct text in images), fetching relevant assets from the web by scraping, identifying the relevant scenes in videos fetched online using LLaVa's vision model, determining image relevance using zero-shot techniques, Meta's MusicGen for background music generation. Used NodeJS for video generation with an add-on option to edit video post generation with a seem-less UI to generate and view the xml created with a timeline component.
- **Autogen-ui-examples:** Designing systems using Microsoft's Autogen recipe, teachable agents and many other functionalities. Also has YouTube tutorials for the same. Also includes example usage of LangChain, LM-Studio, open-source LLMs, and RAG implementations, mem-gpt, auto-lim etc. These projects are aimed at demystifying and simplifying the world of AI and language models.
- **Developed Internal Slack** bots that enhance workplace efficiency by providing instant responses to internal documents, improving accessibility and collaboration within the company
- **Pair-Programmer:** Designed and implemented a solution to streamline automated coding tasks using the open-source Aider project, built on universal C-tags. This project aims to make coding tasks more efficient and less cumbersome, saving time and effort.
- **Dailyhunt PWA:** Built from scratch highly fast and reliable native-feel like PWA of Dailyhunt mobile and desktop website using React.js, Express.js, Webpack, Babel, Mobs, few with remix of libraries like React-Virtualized(react-window), React-Swipable-Views to support route change on swipe/tap etc. with all the capabilities like push-notification, offline-mode, add-to-homescreen, SSR, ads support, lazy load components, instrumentation using indexedbo etc., thus bringing out untapped potential through a web browser. Had given a talk on the same which was organised by Matrix Partners.
- **Expresso PWA:** Built from scratch PWA app for mobile and desktop web using NextJS. A sweet and short, best and latest news at a glance with one-liners, images & videos in the form of stories.
- **Machine Learning using TensorflowJS:** Used ML to identify(non browser) NSPV content in ads and thus blocking them. Extracting the apparels and other wearables from images using coco-ssd and body segmentation models, to pass in the 3rd party APIs to get similar curated products in ads.
- **MENA PWA:** Mobile and desktop PWA, news app targeted for Middle East Nations. Initially had built from scratch android/los native apps in React-Native and Flutter as MVP, but later it was decided to built the same in pure native app.
- **PWA Api Layer:** Built from scratch highly fast and scalable mid api layer, to bare the computational/multiple calls/data restructuring burden from the PWA clients, thus keeping them super light.
- **Native app webviews:** Built from scratch an InfernoJS based app, which is used for most of the webview contents in native apps. Was majorly built for few campaigns like DailyCash by sharing news articles and was later used for many others.
- **In-browser partner apps:** Was as part of building in-browser news serving app in Samsung, Xiaomi and other mobile partners (some in browser landing page, few in -1 screen of mobiles) which eventually gets traffic to Dailyhunt's PWA.

**Myntra Designs Pvt Ltd, A Flipkart subsidiary. April 2014 - May 2017** Software Developer

- **DeveloperAPI:** Worked on building highly fast and scalable mid-layer using NodeJS to seamlessly support multiple platforms like Android/iOS/Windows/Web. This layer also reduces client calls by combining multiple requests from various different services into one and stitching them as per the client.
- **Myntra mobile and desktop website:** Worked on the Node + Expressjs layer dealing with user authorisation, product search, size chart, analytics etc.
- **Switch (internal tool):** Built web app in ReactJS which is used to change the universal configurations used by all the apps like app-configs, feature-gates etc.
- **URL-Shortner:** Had first built using Retthinkdb-NodeJS and then moved to Aerospike-NodeJS, with an ability to serve 95 million+ documents.
- **Captcha:** Had created a service which creates and validates captcha and is used wide over all the Myntra apps and websites.

**Playdom, The Walt Disney Company Jan 2013 - March 2014** Software Developer

- **Porting games to LG Smart TV:** Ported Disney movie based games "Monsters Inc. Run", "Cars 2", "Toy Story Smash It", "Where's My" titles (Where's My Water, Where's My Perry, Where's My Mickey), "Agent Perry" to LG Smart TV where each game was written in different platforms like Unity3d, pure C/C++, html5 etc.
- **Samsung and Amazon kindle app store projects:** Implemented the InApp-Purchase SDK for these app stores and ported existing games like "Monsters University", "Pirate Wars", "Marvel Run Jump Smash" and "Where's My" title games with bug fixes.

**InMobi, The Largest Independent Mobile ad Network
June 2012 - Aug 2012**
Intern

- Automated Screenshot Simulator: Standalone java tool using java-swings, python script, shell script and Android. Uses the url to download an app from google play store, downloads ,installs, runs and take screenshots as per the given duration and interval time.
- Neo-Smart: A reporting Android app using JSON filters, retrieves data runtime for the given account, plots relevant graphs on swipe and allows to select items from the tree structure.
- Sales tools: Android app for marketing team campaign managers, that allows to select country from world-map on touch, display relevant data and options to edit.

## Education
**BE in Information Science and Engineering
2009 - 2013**
R.V College Of Engineering
Secured CGPA 9.2

**12th Class
2008 - 2009**
Sri Sathya Sai Higher Secondary School, Puttaparthi ,Andra Pradesh
Secured 90%

**10th Class, CBSE
2006 - 2007**
Sri Sathya Sai Vidya Kendra
Secured 93%

## Other Projects
- Singleton react component renderer
- Had built from scratch android and los native apps using Flutter along with mobile and desktop website for a friend who runs a mini travel tech business FlyGoldfinch.
- Working on a AI project using TensorflowJS for building aerobics-dance and yoga teaching platform for a friend who runs a gym.
- Having hands on video editing in Adobe After Effects and have expertise in using Red Giant Universe for VFX, object tracking etc.
```