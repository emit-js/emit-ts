# @emit-js/emit

A javascript event emitter for a new ecosystem of observable libraries.

![emit](media/emit.gif)

## Mission

We aim to define a standard, flexible API for javascript event emitting.

Using this API, **we are building an ecosystem of observable & composable libraries**.

Libraries export "emit composers" — functions that add listeners to the emitter.

Libraries should be small and universal. The emit library is less than 1 kb compressed & gzipped and works on any browser.

## Effects

Using emit reduces lines of code typically devoted to importing and instatiating code across many files.

With minimal to no code changes, users can dynamically add functionality (such as logging) to any listener.

The emit composer pattern decouples libraries at the npm dependency level. End users maintain full control over library versioning and composition.

Emit better enables library authors to flexibly degrade if users choose not to include certain components. Emit works great with dynamic imports.
