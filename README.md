# 🌱 Garden

[TODO LOGO + DEMO IMAGE]

Garden is a specification for modeling an ecosystem (e.g. of products, services) as a directed acyclic graph with unlimited category recursion. This repository holds a CLI for generating the JSON schema in `cli`, and visualizer web app in `app`, powered by Next.js.

For a reference implementation, check out the [Omniverse](https://verse.omni.dev) (coming soon).

In the future, a `<Garden />` React component will be created as well as the ability to compose and nest gardens as "subgardens" within a "supergarden".

Garden layouting is currently powered by [ELK](https://rtsys.informatik.uni-kiel.de/elklive), more layouting engines will be supported in the future.

## Why "Garden"?

*Cultivation*. A garden is a place where plants are grown and cultivated, and digital ecosystems thrive on this same approach.

## Features

- A visual representation of an ecosystem of projects and their relationships
- Composable: point to a garden spec, load it into a node as a "sub-garden"

## Generate the Schema

`cd cli`, then `cargo run -- $OUTPUT_FILE`. For example, `cargo run -- garden.schema.json`.

## Local Development (Web App)

The app is a landing page and visualizer for Garden schemas. `cd app`, then continue below.

### Generate Types from Schema

`bun generate`

### Building and Running

```sh
bun install
```

```sh
bun run dev
```

## Inspiration

Garden is inspired by the [CNCF Landscape](https://landscape.cncf.io) project, which is a collection of projects that are part of the [CNCF](https://cncf.io). The CNCF Landscape is a visual representation of the projects and their relationships, making it easier to understand the relationships between projects and the larger ecosystem.

## License

The code in this repository is licensed under MIT, &copy; Omni LLC. See [LICENSE.md](LICENSE.md) for more information.
