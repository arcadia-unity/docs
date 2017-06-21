---
layout: default
---

## arcadia.core

## log

### Syntax
`(log & args)`

### Description
Log message to the Unity console. Arguments are combined into a string.

### Arguments
* `args`

### Examples
```
;; strings work
(log "Hello, Arcadia!")
```

```
;; strings work
(log "Hello, Arcadia!")
```

```
;; arguments are combined as in str
(let [n (rand)]
  (log "Want a number? " n ". Done!"))
```

```
;; arguments are combined as in str
(let [n (rand)]
  (log "Want a number? " n ". Done!"))
```

```
;; log can also be used as quick debug hook
(hook+ (object-named "Main Camera") :update log)
```

---

## null-obj?

### Syntax
`(null-obj? x)`

### Description
Is x nil?

This test is complicated by the fact that Unity uses a custom null object that evaluates to true in normal circumstances. null-obj? will return true if x is nil or Unity's null object.


### Arguments
* x `Object`

### Examples

```
;; Unity interop calls will return Unity's null object
;; The Main Camera has no Rigidbody by default
(let [rb (.GetComponent
           (object-named "Main Camera")
           UnityEngine.Rigidbody)]
  rb              ;; => #unity/Object 0
  (boolean rb)    ;; => true
  (null-obj? rb)) ;; => true
```

```
;; arcadia functions use null-obj? internally to present
;; a more consistent view of the Unity scene graph
(cmpt (object-named "Main Camera") UnityEngine.Rigidbody) ;; => nil
```

---

## obj-nil

### Syntax
`(obj-nil x)`

### Description
Inlined version of null-obj? Could be merged in the future.

### Arguments
* x

---

## instantiate

### Syntax
`(instantiate original)`  
`(instantiate original position)`  
`(instantiate original position rotation)`

### Description
Clones the original object and returns the clone. The clone can optionally be given a new position or rotation as well. Wraps UnityEngine.Object/Instantiate.


### Arguments
* original `Object`
* position `Vector3`
* rotation `Quaternion`

### Examples
```
;; create a new camera identical to the default camera   
(let [new-camera (instantiate (object-named "Main Camera"))]
  new-camera          ;; => #unity/Object -6904
  (.name new-camera)) ;; "Main Camera(Clone)"
```

```
;; create a new camera at a new position
(instantiate (object-named "Main Camera")
             (v3 100 20 10))
```

```
;; create a new camera at a new position
;; looking at the origin
(instantiate (object-named "Main Camera")
             (v3 100 20 10)
             (qlookat (v3 100 20 10)
                      (v3 0)))
```

---

## create-primitive

### Syntax
`(create-primitive prim)`

### Description
Creates a game object with a primitive mesh renderer and appropriate collider. prim can be a PrimitiveType or one of :sphere :capsule :cylinder :cube :plane :quad. Wraps GameObject/CreatePrimitive.

### Arguments
* prim

### Examples
```
;; create the default Unity cube
(create-primitive :cube)
```

---

## destroy

### Syntax
`(destroy obj)`  
`(destroy obj t)`  

### Description
Removes a gameobject, component or asset. When called with t, the removal happens after t seconds. Wraps UnityEngine.Object/Destroy.

The difference between destroy and destroy-immediate is still being worked out.


### Arguments
* obj `Object`
* t `Double`

### Examples
```
;; remove the default camera
(destroy (object-named "Main Camera"))
```

```
;; remove every object with player in its name
(doseq [o (objects-named #".*player.*")]
  (destroy o))
```

```
;; remember that map is lazy, so the following will
;; not work as expected
(map destroy (objects-named #".*player.*"))
;; instead, force evaluation with dorun or do all
(dorun (map destroy (objects-named #".*player.*")))
;; mapv returns a vector, and also forces evaluation
(mapv destroy (objects-named #".*player.*"))
```