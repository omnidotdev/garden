# 🌱 Garden

<div align="center">
  <img src="/apps/web/public/img/logo.png" width="150" />

  [Website](https://garden.omni.dev) | [Docs](https://docs.omni.dev/garden/overview)
</div>

Garden is a specification for modeling an ecosystem (e.g. of products, services) as a directed graph with unlimited recursion and composability. This repository holds a CLI for generating the JSON schema in `apps/cli`, a library published to `@omnidotdev/garden` in `apps/library`, and a visualizer web app in `apps/web`, powered by Next.js.

For a reference implementation, check out the [Omniverse](https://verse.omni.dev).

Garden layouting is currently powered by [ELK](https://rtsys.informatik.uni-kiel.de/elklive), more layouting engines will be supported in the future.

## Why "Garden"?

*Cultivation*. A garden is a place where plants are grown and cultivated, and digital ecosystems thrive on this same approach.

## Features

- A visual representation of an ecosystem of projects and their relationships
- Composable: each garden is independently processable as its own garden, and gardens can be nested inside of each other ("supergardens" and "subgardens").

## Generate the Schema

`cd cli`, then `cargo run -- $OUTPUT_FILE`. For example, `cargo run -- ../../garden.schema.json`.

## Local Development (Library and Web App)

The app is a landing page and visualizer for Garden schemas.

### Generate Types from Schema

`cd apps/library && bun generate`

### Building and Running

```sh
bun install
```

```sh
bun turbo build
```

```sh
bun turbo dev
```

## Inspiration

Garden is inspired by the [CNCF Landscape](https://landscape.cncf.io) project, which is a collection of projects that are part of the [CNCF](https://cncf.io). The CNCF Landscape is a visual representation of the projects and their relationships, making it easier to understand the relationships between projects and the larger ecosystem.

## License

The code in this repository is licensed under MIT, &copy; Omni LLC. See [LICENSE.md](LICENSE.md) for more information.
