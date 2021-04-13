# MERN Stack CRUD App Using TypeScript

> A simple Management System implementing CRUD operations using TypeScript.

<br>

## Typescript MERN Setup Commands

<br>
<br>

### GENERAL TS SETUP

1. Install TypeScript globally

```
<sudo> npm i -g typescript
```

2. Check TypeScript Compiler version:

```
tsc --version
```

3. Compile a .ts file
   <br>
   NOTE: The output file will have a .js extension

```
tsc <fileName.ts>
```

4. Generate a tsconfig.json file

```
tsc --init
```

NOTE: After the tsconfig.json file is generated modify the variables accordingly like root dir, out dir module type, target version, moduleRes, et cetera.

5. Run the tsc in watch mode

```
tsc -w
```

<br>
<br>

SERVER

1. Init and Install the required modules

```
npm i express ...
```

2. Install the dev dependencies

```
npm i typescript ts-node nodemon @types/node @types/express
```

3. Modify package.json and add following scripts:

```
    "start": "node dist/app.js",
    "dev": "nodemon src/app.ts",
    "build": "tsc -p ."
```

<br>
<br>

CLIENT

1. Run the following command to setup all boilerplate React code with TypeScript

```
npx create-react-app . --template typescript
```
