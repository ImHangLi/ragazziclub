import json
import os

def load_db(filepath="../client/db.json"):
    """Loads the database from a JSON file."""
    try:
        with open(filepath, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Database file not found at '{filepath}'")
        return None

def save_db(db, filepath="db.json"):
    """Saves the database to a JSON file."""
    with open(filepath, 'w') as f:
        json.dump(db, f, indent=4)  # Use indent for pretty printing

def add_car_listing(db):
    """Adds a new car listing to the database."""
    car = {}
    car["id"] = int(input("Enter car ID: "))
    car["brand"] = input("Enter brand: ")
    car["model"] = input("Enter model: ")
    car["year"] = int(input("Enter year: "))
    car["price"] = int(input("Enter price: "))
    car["location"] = input("Enter location: ")
    car["description"] = input("Enter description: ")
    car["image"] = input("Enter main image URL: ")

    images = []
    while True:
        img_url = input("Enter additional image URL (or press Enter to finish): ")
        if not img_url:
            break
        images.append(img_url)
    car["images"] = images


    specifications = {}
    while True:
      spec_key = input("Enter specification (or press Enter to finish specs): ")
      if not spec_key:
          break
      spec_val = input(f"Enter value for {spec_key}: ")
      specifications[spec_key] = spec_val
    car["specifications"] = specifications


    db["carListings"].append(car)
    print("Car listing added successfully!")



def add_research_post(db):
  post = {}
  post["id"] = int(input("Enter post ID: "))
  post["title"] = input("Enter title: ")
  post["author"] = input("Enter author: ")
  post["date"] = input("Enter date (MM/DD/YY): ")
  post["readTime"] = input("Enter read time: ")
  post["description"] = input("Enter short description: ")
  post["content"] = input("Enter the full content of the post: ")
  post["imageUrl"] = input("Enter the main image URL: ")
  images = []
  while True:
      img = input("Enter image URL (or type 'done'): ")
      if img.lower() == 'done':
          break
      images.append(img)
  post["images"] = images


  db["posts"].append(post)

def update_default_contact(db):
    """Updates the default contact information."""
    contact = db["default_contact"][0]  # Assumes only one default contact
    for key in ["name", "email", "phone", "photo"]:
      new_val = input(f"Enter new {key} (or press Enter to keep current value '{contact.get(key, '')}'): ")
      if new_val:
        contact[key] = new_val

    print("Default contact updated successfully!")

def print_items(items, item_type): #new
  """Prints items with their IDs, sorted by ID."""
  if not items:
      print(f"No {item_type} found.")
      return

  items.sort(key=lambda x: x["id"]) # Sort by ID

  for item in items:
    print(f"{item_type.capitalize()} {item['id']}:")
    for k,v in item.items():
      print(f"\t{k}: {v}")



def update_item(db, item_type, item_id): #new
    """Updates a specific item in the database."""

    items = db.get(item_type)
    if not items:
        print("Item type not found.")
        return

    item_index = next((i for i, item in enumerate(items) if item['id'] == item_id), None)

    if item_index is None:
        print("Item not found.")
        return

    item = items[item_index]

    for key in item:
        if key != 'id':
          if isinstance(item[key], list) or isinstance(item[key], dict):
              print(f"Skipping complex key '{key}' (list or object)")
              continue


          new_val = input(f"Enter new {key} (or press Enter to keep current value '{item.get(key, '')}'): ")
          if new_val:
            try:
              item[key] = int(new_val) if isinstance(item[key], int) else new_val #casting
            except ValueError: #Error Handling
                print("Invalid input. Keeping original Value")

    print(f"{item_type} updated successfully")



def manage_section(db, section_name): #new
  while True:
    print_items(db.get(section_name), section_name[:-1]) #prints listings in order, for user to see choices
    choice = input(f"Enter the ID of the {section_name[:-1]} to update (or type 'back' to return to the main menu, 'add' to add a new entry): ")

    if choice.lower() == 'back':
        break
    elif choice.lower() == 'add':
        if section_name == 'carListings':
          add_car_listing(db)
        elif section_name == 'posts':
          add_research_post(db)

    else:
        try:
            item_id = int(choice)
            update_item(db, section_name, item_id)
        except ValueError:
            print("Invalid input. Please enter an ID or 'back'.")



def main():
    """Main function for the database utility."""

    filepath = input("Enter database filepath (default: client/db.json): ") or "client/db.json"
    db = load_db(filepath)

    if db is None:
        return

    while True:
        print("\nDatabase Management Utility")
        print("1. Manage car listings")
        print("2. Manage research posts")
        print("3. Manage default contact details")
        print("4. Save and exit")

        choice = input("Enter your choice: ")

        if choice == '1':
            manage_section(db, "carListings")
        elif choice == '2':
            manage_section(db, "posts")
        elif choice == '3':
            update_default_contact(db)
        elif choice == '4':
            save_db(db, filepath)
            print("Database saved. Exiting.")
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()