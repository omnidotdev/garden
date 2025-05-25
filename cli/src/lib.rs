use schemars::{JsonSchema, schema_for};
use serde::{Deserialize, Serialize};

// GardenItem struct representing items in the garden
#[derive(JsonSchema, Serialize, Deserialize, Debug)]
pub struct GardenItem {
    pub name: String,
    pub homepage_url: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub logo: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub repo_url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub project_url: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub twitter: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
}

// GardenReference struct for linking to other gardens
#[derive(JsonSchema, Serialize, Deserialize, Debug)]
pub struct GardenReference {
    pub name: String,
    pub url: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub logo: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub version: Option<String>,
}

// Category struct (recursively defined)
#[derive(JsonSchema, Serialize, Deserialize, Debug)]
pub struct Category {
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub icon_color: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub items: Option<Vec<GardenItem>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub categories: Option<Vec<Category>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub garden_refs: Option<Vec<GardenReference>>,
}

// Maintainer struct
#[derive(JsonSchema, Serialize, Deserialize, Debug)]
pub struct Maintainer {
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub email: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub url: Option<String>,
}

// Theme struct
#[derive(JsonSchema, Serialize, Deserialize, Debug)]
pub struct Theme {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub primary_color: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub secondary_color: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub background_color: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub text_color: Option<String>,
}

// The main Garden struct
#[derive(JsonSchema, Serialize, Deserialize, Debug)]
pub struct Garden {
    pub name: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,
    pub version: String,
    pub categories: Vec<Category>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub maintainers: Option<Vec<Maintainer>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub created_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub updated_at: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub theme: Option<Theme>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub supergardens: Option<Vec<GardenReference>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub subgardens: Option<Vec<GardenReference>>,
}

// Function to generate JSON schema for Garden
pub fn generate_garden_schema() -> schemars::schema::RootSchema {
    schema_for!(Garden)
}

#[cfg(test)]
mod tests {
    use super::*;
    use jsonschema::JSONSchema;
    use serde_json::Value;

    #[test]
    fn test_schema_and_serde() -> Result<(), Box<dyn std::error::Error>> {
        // Generate JSON Schema
        let schema = generate_garden_schema();
        let schema_value: Value = serde_json::to_value(&schema)?;

        // Compile schema
        let compiled_schema = JSONSchema::options()
            .compile(&schema_value)
            .expect("Failed to compile schema");

        // Input JSON for a simple garden
        let input = serde_json::json!({
            "name": "Test Garden",
            "description": "A test garden",
            "version": "1.0.0",
            "categories": [
                {
                    "name": "Test Category",
                    "description": "A test category",
                    "items": [
                        {
                            "name": "Test Item",
                            "homepage_url": "https://example.com",
                            "description": "A test item"
                        }
                    ]
                }
            ]
        });

        // Validate
        let result = compiled_schema.validate(&input);
        if let Err(errors) = result {
            for err in errors {
                eprintln!("Validation error: {}", err);
            }
            return Err("Validation failed".into());
        }

        // Decode
        let garden: Garden = serde_json::from_value(input.clone())?;
        println!("Decoded: {:?}", garden);

        // Encode
        let encoded = serde_json::to_string(&garden)?;
        println!("Encoded: {}", encoded);

        Ok(())
    }

    #[test]
    fn test_invalid_input() -> Result<(), Box<dyn std::error::Error>> {
        // Generate JSON Schema
        let schema = generate_garden_schema();
        let schema_value: Value = serde_json::to_value(&schema)?;

        // Compile schema
        let compiled_schema = JSONSchema::options()
            .compile(&schema_value)
            .expect("Failed to compile schema");

        // Invalid JSON (missing required 'version' field)
        let invalid_input = serde_json::json!({
            "name": "Invalid Garden",
            "categories": []
        });

        // Validate (should fail)
        let result = compiled_schema.validate(&invalid_input);
        match result {
            Ok(_) => {
                return Err("Expected validation to fail".into());
            }
            Err(errors) => {
                // Print validation errors
                for err in errors {
                    eprintln!("Validation error: {}", err);
                }
            }
        }

        Ok(())
    }
}
