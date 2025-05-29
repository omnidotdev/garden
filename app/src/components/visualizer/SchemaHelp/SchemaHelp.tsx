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
          <code className="rounded bg-muted px-1 text-sm">version</code>:
          Version of the schema
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">categories</code>:
          Array of categories
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
      <h4 className="font-medium">Category Structure:</h4>
      <ul className="list-disc space-y-1 pl-6">
        <li>
          <code className="rounded bg-muted px-1 text-sm">name</code>: Category
          name
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">description</code>:
          (Optional) Category description
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">items</code>:
          (Optional) Array of item objects
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">categories</code>:
          (Optional) Array of category objects (recursive)
        </li>
        <li>
          <code className="rounded bg-muted px-1 text-sm">garden_refs</code>:
          (Optional) Array of garden reference objects related to this category
        </li>
      </ul>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">Recursive Structure:</h4>
      <p>
        Categories can contain nested categories which are themselves
        categories, allowing for infinite nesting. Each category can contain
        both items and further categories.
      </p>
    </div>

    <div className="space-y-2">
      <h4 className="font-medium">Item Structure:</h4>
      <ul className="list-disc space-y-1 pl-6">
        <li>
          <code className="rounded bg-muted px-1 text-sm">name</code>: Item name
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
          (Optional) Item description
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
