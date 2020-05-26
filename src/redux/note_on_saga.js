// note from instructors
// Before we continue, I would like to make one quick correction about when Sagas fire in our redux flow. In the previous video I mentioned that sagas fire before reducers, it's actually the other way around! Reducers fire first, then sagas receive the action. From there, sagas can fire off new actions which in turn hit the reducers and other sagas as well!
// This correction does not change any of the code we will write for the remainder of the course, it's just a small correction on a theoretical level. The impact is also not significant because we write actions that only our sagas are listening for, our reducers receiving it before the sagas is not an issue because our reducers are not reacting to these actions that are intended for our sagas :) With that in mind, please continue with the course!

// Question
// Everywhere on the internet seems like they say that it works the way you presented in the video and not in the other way.
// // For example see the diagrams here:
// https://scalac.io/redux-saga-handle-side-effects-2/
// https://i.ytimg.com/vi/KdLCSDrNtoE/maxresdefault.jpg
// https://www.freecodecamp.org/news/login-using-react-redux-redux-saga-86b26c8180e/
// https://itnext.io/scalable-redux-architecture-for-react-projects-with-redux-saga-and-typescript-f6afe1dece9b

// Also middleware in general, as presented in the videos take action before the reducers, why would saga be any different?

// Yihua — InstructorAnswer

// This is indeed one of the quirks for this middleware in particular. You can find the note here in the link in the official saga documentation for select:
// https://redux-saga.js.org/docs/api/index.html#selectselector-args
// There's also an issue chain here in the official repo that also walks through why this is the intended behaviour:
// https://github.com/redux-saga/redux-saga/issues/148
// As for what you've found online, it's definitely a common misconception with sagas :)

// -- questioner
// I see, so the sagaMiddleware actually intercepts normally the actions as we'd expect from middlewares.
// But it forwards them unmodified to the normal reducers and only then notifies the sagas.
// Now it does make sense!
