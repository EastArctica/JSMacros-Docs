# AttackEntity Event

This event is fired when the player attacks an entity by left-clicking it. Backed by class `EventAttackEntity`.

## Signature
```js
JsMacros.on("AttackEntity", (event) => {
  // ...
});
```

```js
JsMacros.on("AttackEntity", JavaWrapper.methodToJavaAsync((event) => {
  // ...
}));
```

## Event payload

| Field   | Type          | Description                        |
| ------- | ------------- | ---------------------------------- |
| entity  | EntityHelper  | The entity that was attacked       |

## Behavior

* Fires when the player left-clicks an entity to attack it
* Only triggers for entities that can be attacked (living entities, players, etc.)
* Not cancellable

## Minimal example

```js
JsMacros.on("AttackEntity", (e) => {
  const entity = e.entity;
  Chat.log(`Attacked ${entity.getName().getString()}`);
});
```

## Async example

```js
JsMacros.on("AttackEntity", JavaWrapper.methodToJavaAsync((e) => {
  const entity = e.entity;

  if (entity.isLiving()) {
    const health = entity.getHealth();
    const maxHealth = entity.getMaxHealth();
    Chat.log(`Attacked ${entity.getName().getString()} [${health.toFixed(1)}/${maxHealth.toFixed(1)} HP]`);
  } else {
    Chat.log(`Attacked non-living entity: ${entity.getName().getString()}`);
  }
}));
```

## Fields
- [event.entity](#evententity)

## Methods
- [event.toString()](#eventtostring)

### event.entity
A helper object representing the entity that was attacked.

**Type:** `EntityHelper`

### event.toString()
Returns a string representation of the event object.

**Params**
* `(none)`

**Returns**
* `string`