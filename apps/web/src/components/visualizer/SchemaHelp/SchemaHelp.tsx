// TODO automatically generate this from schema to minimize human error and drift

/**
 * Schema Help.
 */
const SchemaHelp = () => (
  <div className="space-y-4">
    <h3 className="font-medium text-lg">Garden Schema Structure</h3>
    <p>The Garden schema is designed to visualize ecosystems:</p>

    <div className="space-y-2">
      <h4 className="font-medium">Required Fields:</h4>
      <ul className="list-disc space-y-1 pl-6">
        <li>
          <code className="rounded bg-muted px-1 text-sm">name</code>: Name of
          your Garden
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">subgardens</code>:
          Array of garden reference objects that belong to this garden
        </li>
      </ul>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">Optional Fields:</h4>
      <ul className="list-disc space-y-1 pl-6">
        <li>
          <code className="rounded bg-muted px-1 text-sm">description</code>:
          Description of your Garden
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">sprouts</code>: Array
          of sprout objects directly in the garden
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">maintainers</code>:
          Array of maintainer objects
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">created_at</code>:
          Creation timestamp
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">updated_at</code>:
          Last update timestamp
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">theme</code>: Visual
          theme settings
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">supergardens</code>:
          Array of garden reference objects that this garden belongs to
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">subgardens</code>:
          Array of garden reference objects that belong to this garden
        </li>
      </ul>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">Organizational Structure:</h4>
      <p>
        Gardens can contain sprouts directly and can have subgardens, which can
        themselves have sprouts and further subgardens, allowing for
        hierarchical organization of resources.
      </p>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">Sprout Structure:</h4>
      <ul className="list-disc space-y-1 pl-6">
        <li>
          <code className="rounded bg-muted px-1 text-sm">name</code>: Sprout
          name
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">homepage_url</code>:
          Website URL
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">logo</code>: Logo URL
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">repo_url</code>:
          (Optional) Repository URL
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">description</code>:
          (Optional) Sprout description
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">twitter</code>:
          (Optional) Twitter handle
        </li>
      </ul>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">Garden Reference Structure:</h4>
      <ul className="list-disc space-y-1 pl-6">
        <li>
          <code className="rounded bg-muted px-1 text-sm">name</code>: Garden
          name
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">url</code>: URL to the
          referenced garden
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">description</code>:
          (Optional) Garden description
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">logo</code>:
          (Optional) Logo URL
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">version</code>:
          (Optional) Garden version
        </li>
      </ul>
    </div>
  </div>
);

export default SchemaHelp;
