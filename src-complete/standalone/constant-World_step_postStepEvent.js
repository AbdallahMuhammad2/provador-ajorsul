/* Standalone Constant: World_step_postStepEvent */

const World_step_postStepEvent = {
    type: "postStep"
}
  , World_step_preStepEvent = {
    type: "preStep"
}
  , World_step_collideEvent = {
    type: Body.COLLIDE_EVENT_NAME,
    body: null,
    contact: null
}
  , World_step_oldContacts = []
  , World_step_frictionEquationPool = []
  , World_step_p1 = []
  , World_step_p2 = []
  , additions = []
  , removals = []
  , beginContactEvent = {
    type: "beginContact",
    bodyA: null,
    bodyB: null
}
  , endContactEvent = {
    type: "endContact",
    bodyA: null,
    bodyB: null
}
  , beginShapeContactEvent = {
    type: "beginShapeContact",
    bodyA: null,
    bodyB: null,
    shapeA: null,
    shapeB: null
}
  , endShapeContactEvent = {
    type: "endShapeContact",
    bodyA: null,
    bodyB: null,
    shapeA: null,
    shapeB: null
};

export default World_step_postStepEvent;
