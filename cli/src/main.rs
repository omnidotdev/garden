use std::env;
use std::fs::File;
use std::io::Write;
use std::path::Path;
use std::process;

use garden::{Garden, generate_garden_schema};

fn main() {
    // Parse command line arguments
    let args: Vec<String> = env::args().collect();

    // Print usage if no output path is provided
    if args.len() < 2 {
        eprintln!("Usage: garden-schema <output-path>");
        eprintln!("  Generates JSON Schema for Garden and saves it to the specified file");
        process::exit(1);
    }

    // Get the output path from command line arguments
    let output_path = &args[1];

    // Generate the schema
    let schema = generate_garden_schema();

    // Convert schema to JSON
    let schema_json = match serde_json::to_string_pretty(&schema) {
        Ok(json) => json,
        Err(err) => {
            eprintln!("Error serializing schema to JSON: {}", err);
            process::exit(1);
        }
    };

    // Write the schema to the output file
    let path = Path::new(output_path);
    let mut file = match File::create(&path) {
        Ok(file) => file,
        Err(err) => {
            eprintln!("Error creating output file {}: {}", output_path, err);
            process::exit(1);
        }
    };

    match file.write_all(schema_json.as_bytes()) {
        Ok(_) => {
            println!("Successfully wrote schema to {}", output_path);

            // Print schema information
            let schema_spec = schema.schema.clone();
            if let Some(props) = schema_spec.object {
                let prop_count = props.properties.len();
                println!("Schema contains {} top-level properties", prop_count);

                // Print a sample record
                println!("\nExample Garden structure:");
                let example = Garden {
                    name: "Example Garden".to_string(),
                    description: Some("An example garden".to_string()),
                    version: "1.0.0".to_string(),
                    items: Some(vec![]),
                    maintainers: None,
                    created_at: None,
                    updated_at: None,
                    theme: None,
                    supergardens: None,
                    subgardens: None,
                };

                match serde_json::to_string_pretty(&example) {
                    Ok(example_json) => println!("{}", example_json),
                    Err(err) => eprintln!("Error creating example: {}", err),
                }
            }
        }
        Err(err) => {
            eprintln!("Error writing to output file {}: {}", output_path, err);
            process::exit(1);
        }
    };
}
