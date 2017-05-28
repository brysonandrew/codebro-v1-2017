import * as React from 'react';
import { IPost } from '../models';

export let blogPosts: IPost[] = [
    {
        name: "WeGL fallback (for THREE.js)",
        category: "Web Development",
        link: "https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Object",
        status: "",
        date: "11 May 2017",
        content:
            [
                "So the other day Chrome refused to render the beautiful 3D particle on codebro.io.",
                "This motivated me to find a fallback for the WebGL renderer.",
                "Looking around on the internet it was hard to find a single solution.",
                "So I have Frankensteined some solutions together and came up with the method you see below.",
                <pre>
{`export const isGL = () => {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl")
        || canvas.getContext("experimental-webgl");
    return gl && gl instanceof WebGLRenderingContext
};`}
                </pre>
            ],
        image: "/images/blogPosts/webGLFallbackForTHREEjs/threejs.jpg"
    },
    {
        name: "Some useful Object manipulation without libraries",
        category: "Web Development",
        link: "https://developer.mozilla.org/pl/docs/Web/JavaScript/Referencje/Obiekty/Object",
        status: "",
        date: "27 Apr 2017",
        content:
            [
                "Libraries such as lodash and underscore provide some nice, out-of-the-box methods for manipulating Objects",
                "But what if you don't feel like installing these?",
                "Here are some ways to still do cool stuff with Objects",
                <div>
                    <h2>Are two Objects the same?</h2>
                    <code>
                        const isObjectsEqual = JSON.stringify(obj1)===JSON.stringify(obj2);
                    </code>
                </div>,
                <div>
                    <h2>Is Object empty?</h2>
                    <code>
                        const isObjectEmpty = Object.keys(obj).length === 0 && obj.constructor === Object;
                    </code>
                </div>,
                <div>
                    <h2>Does a specific key exist in an Object?</h2>
                    <code>
                        const isKey = key in obj;
                    </code>
                </div>

            ],
        image: "/images/blogPosts/objectManipulationWithoutLibraries/curlyBraces.png"
    },
    {
        name: "Regular expressions and whitespace",
        category: "Web Development",
        link: "https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions",
        status: "",
        date: "18 Apr 2017",
        content:
            [
                "Quick test: If you see a string with ",
                <code>"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"</code>,
                "how would you convert this to",
                <div>
                    <code>"SPACESPACETABTABSPACETABSPACE"</code>
                    <span>?</span>
                </div>,
                "The answer is with regular expressions.",
                "Firstly, store the string into a variable",
                <code>let string = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";</code>,
                "Then, add some regexp magic for tabs.",
                <code>string = string.replace(/\t/g, "TAB");</code>,
                "And then, spaces. This must come second or the tabs will be prematurely converted to spaces.",
                <code>string = string.replace(/\s/g, "SPACE");</code>,
                "And voila, We have decoded the mysterious whitespace!",
                <code>console.log(string); //"SPACESPACETABTABSPACETABSPACE"</code>,
                <img style={{height: 220, width: "auto"}}
                     src="/images/blogPosts/regexpWhitespace/regexpEgyptian.jpg"/>,
            ],
        image: "/images/blogPosts/regexpWhitespace/whiteSpace.jpg"
    },
    {
        name: "Linux tools for Windows",
        category: "Web Development",
        link: "http://www.linux.org/",
        status: "",
        date: "8 Apr 2017",
        content:
            [
                "The Linux operating system has the reputation for being programmer-friendly. It provides shell-access to the terminal and a range of useful commands for a superior terminal user-interface.",
                "The built-in Windows terminal is the \"Command prompt\" which lacks many if not most of the Linux terminal commands.",
                "To bridge this gap we must use certain tools to make Windows perform certain tasks.",
                <h2>Linux on Windows</h2>,
                "Firstly I should mention that the silver-bullet here is to dual-boot Windows and Linux, which basically means installing Linux into Windows. Although this sounds great it still comes with its downsides.",
                <ul style={{listStyleType: "decimal"}}>
                    <li>Extra storage required for the additional OS</li>
                    <li>System storage is mapped differently for both OS meaning you may need to manually transfer files from one OS to the other.</li>
                    <li>It takes time to shut down one OS and reboot the other.</li>
                </ul>,
                <h2>Linux tools for Windows</h2>,
                <h4>PuTTy</h4>,
                "A terminal emulator that allows SSH access to connect to other machines. Very easy to set up and large community.",
                <h4>Cygwin</h4>,
                "Command-line interface providing Linux commands. Specific packages must be included on install depending on what you need to do.",
                <h4>Windows Subsystem for Linux (WSL)</h4>,
                "Available on Windows 10 and still in the beta stage of development. You can install specific packages on the command line.",
                "This is by no means an exhaustive list, only the tools I have looked at."
            ],
        image: "/images/blogPosts/linuxTools/windows10.png"
    },
    {
        name: "Screenshots with Phantomjs and Slimerjs",
        category: "Web Development",
        link: "https://phantomjs.org/",
        status: "",
        date: "29 Mar 2017",
        content:
            [
                <span>Although this is pretty much a copy / paste from the phantomjs website <a href="http://phantomjs.org/screen-capture.html">see here</a> I thought it was a really cool feature that is worth knowing about.</span>,
                "Here are step by step instructions to take a screenshot with phantomjs.",
                <div>
                    <ul style={{listStyleType: "decimal"}}>
                        <li>Install phantomjs so that you can run it in the command line</li>
                        <li>Create a file called screenshot.js</li>
                        <li>Add the following code
                            <pre>
{`var page = require('webpage').create();
page.open('http://codebro.io', function() {
    page.render('codebro.png');
    phantom.exit();
});`}
                            </pre>
                        </li>
                        <li>Run phantomjs
                            <code>phantomjs screenshot.js</code>
                        </li>
                    </ul>
                </div>,
                "Now as you can see the screenshot has no background. That's because phantomjs cannot pick up anything rendered on WebGL (ie/ 3D web graphics).",
                <img style={{height: 100, width: "auto"}} src="/images/blogPosts/phantomjsScreenshots/codebroNoBackground.png"/>,
                "The good new is slimerjs can pick up WebGL.",
                <a href="https://slimerjs.org/">
                    <img style={{height: 100, width: "auto"}} src="/images/blogPosts/phantomjsScreenshots/slimerjs.jpg"/>
                </a>,
                "All you need to do is install slimerjs and run your screenshot.js code exactly as is. (Interestingly, slimerjs recognizes even \"phantom.exit()\", but for more serious projects you should change this to \"slimer.exit()\"",
                <code>slimerjs screenshot.js</code>,
                "Slimerjs, however, isn't headless so you will see a browser window appear when you run the code and your screen shot produced."
            ],
        image: "/images/blogPosts/phantomjsScreenshots/phantomjs.png"
    },
    {
        name: "Living for the moment with Momentjs",
        category: "Web Development",
        link: "https://momentjs.com/",
        status: "",
        date: "14 Mar 2017",
        content:
            [
                "Moment.js is a library that helps us handle and display time in JavaScript.",
                "You could look at it like a more user-friendly version of the Javascript \"Date\" instance",
                "I've used it recently to create a date-picker, but it could also be used to show user session, booking and payment info.",
                <h2>To get you started I'll show you how to create the perfect moment</h2>,
                "Firstly you could simply create the current moment like so: ",
                <code>moment()</code>,
                "To edit this moment, it is as easy as doing something like this: ",
                <code>moment("1969-07-16", "YYYY-MM-DD")</code>,
                "or",
                <code>moment("1969-Jul-16", "YYYY-MMM-DD")</code>,
                "Now, maybe you would like to share that special moment?",
                "This can be as easy as: ",
                <pre>
{`const m = moment("1969-07-16", "YYYY-MM-DD")
console.log(m.format("MMM")) //log to console "Jul",
console.log(m.format("YYYY")) //log to console "1969",
console.log(m.format("DD")) //log to console "16"`}
                </pre>,
                "Making my own date-picker has been a good way to get used to and explore the way moment.js works, why not try yourself?",
                'Other ideas could be adding moment JS to your TODO list eg/ \"task completed 2 hours ago\", or user sessions eg/ \"user last logged in last week\"',
                "Soon I will share a link here to my date-picker (after some beta testing). If I forget please remind me by sending an email."
            ],
        image: "/images/blogPosts/livingForTheMoment/momentjs.png"
    },
    {
        name: "The ultimate webpage build",
        category: "Web Development",
        link: "https://github.com/brysonandrew/isomorphic-react-redux-typescript",
        status: "",
        date: "26 Feb 2017",
        content:
            [   <span>Before talking about the details I should give a shout out to <a href="https://porizi.com">Porizi Technologies</a> for developing this build. So setting up webpack, typescript and isomorphic behaviour is all down to them and their open source project that can be found here.</span>,
                <a href="https://github.com/porizi/isomorphic-react-redux-typescript-bootstrap">
                    Original build
                </a>,
                "When creating and developing a website I use the following technology:",
                "Javascript/HTML/CSS (obviously but I feel remiss if I didn’t mention them)",
                <h2>F  R  O  N  T  E  N  D</h2>,
                <h4>L O G I C</h4>,
                <ul>
                    <li>React.js</li>
                    <li>Redux</li>
                    <li>Typescript</li>
                </ul>,
                <h4>S T Y L E</h4>,
                "Nothing! Just React.js inline styles with a component CSS util where pseudo classes are necessary (hardly ever)",
                <h2>B  A  C  K  E  N  D</h2>,
                <ul>
                    <li>Node.js</li>
                    <li>MongoDB</li>
                    <li>Express.js</li>
                    <li>EJS</li>
                </ul>,
                "Here is a starting point which is open source so feel free to download and use!",
                <a href="https://github.com/brysonandrew/isomorphic-react-redux-typescript">
                    Forked and altered build
                </a>
            ],
        image: "/images/blogPosts/webpageBuild/github-logo.jpg"
    },
    {
        name: "THREEjs essentials",
        category: "Web Development",
        link: "https://threejs.org/examples/misc_controls_orbit.html",
        status: "",
        date: "24 Feb 2017",
        content:
            [
                "As web developers used to working in two dimensions there is one thing that is easy to take for granted when working with a third dimension - space. The good news is that THREE.js has a ton of built in controls and helpers that can give us some control over this.",
                "My favorite tools for helping navigate the third dimension are Orbit Controls and Camera Helper.",
                "The moment I realised how important these were was when I started playing with shadows. Since shadows are rendered using a \"shadow camera\" we can use the Camera Helper and since shadows can appear on any surface we should use Orbit Controls to navigate around our 3D objects",
                "Firstly let's look at THREE.OrbitControls.",
                "These controls I have found the most useful, they allow zoom on trackpad or mousewheel scroll, X and Y axis movement for the arrow keys and radial navigation on mouse drag.",
                "This can help you easily navigate around your project and see what your 3D objects look like from different angles, (as well as see exactly where shadows are going).",
                "If you have an animation loop running you will need to configure the Orbit Controls to update during the loop. Just add \"controls.update()\" inside your loop.",
                "THREE.CameraHelper shows you a kind of cone that shows what your camera is looking at. The camera shows in red the \"near\" limitation you set and the cone stretches out to your \"far\" limitation. The cone is as wide as your \"fov\".",
                "The CameraHelper especially helped because I found my shadow's weren't rendering because my \"far\" limitation, although initially set far enough, was mysteriously changing after render…",
                "To add these controls you simply include this line in your code. Notice they both take your camera object and must be added to the scene to work.",
                <code>Import * as THREE from 'three';</code>,
                <code>const controls = new THREE.OrbitControls(camera);</code>,
                <code>const cameraHelper = THREE.CameraHelper(camera);</code>,
                <code>scene.add(cameraHelper);</code>
            ],
        image: "/images/blogPosts/threejsEssentials/threejs.jpg"
    },
                    {
                        name: "Planning a webpage design for a client",
        category: "Web Development",
        link: "",
        status: "",
        date: "7 Feb 2017",
        content:
            [
                "A basic issue facing web developers is reading the mind of the client. Here are some basic dos and don’ts when it comes to creating a web page from a design perspective for a client.",
                "Do listen carefully and take seriously all and every issue the client has in terms of the way they want to website to be presented. ",
                "Don’t overlook points raised by your client even if you consider them trivial.",
                "Do ask for your client to create a mock up themselves or if they prefer, find examples online of what they would like their website to look like.",
                "Don’t go in blind. This is something I did once and paid the price. I spend 4 hours creating what I thought to be an amazing looking landing page, full of creative flair and vision, while totally missing the mark regarding what the client wanted.",
                "Do send regular updates on what and how their website is developing and be responsive to their feedback.",
                "It is your job as a web developer to allow your client to express and for you to interpret their idea so that the final result is more of a pleasant surprise than a disappointment."
            ],
        image: "/images/blogPosts/howToPlanAWebpageDesign/javascriptIcon.png"
    }
];
