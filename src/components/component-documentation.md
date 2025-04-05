# Component Documentation

## 1. Button.tsx

**Purpose**: A reusable button with customizable text and type.

**Props**:
- `text`: string – Button label (e.g., "Login").
- `type?`: "button" | "submit" | "reset" – HTML button type (default: "button").

**Actual Usage** (from /src/pages/Login.tsx):
```tsx
<Button text="Login" type="submit" />
```

**Context**: Submit button in the login form.

## 2. CheckboxGroup.tsx

**Purpose**: Renders checkboxes for multi-select settings.

**Props**:
- `items`: { id: string; label: string }[] – Checkbox items.
- `onChange`: (selectedIds: string[]) => void – Handler for selection changes.

**Actual Usage** (from /src/pages/Settings.tsx):
```tsx
<CheckboxGroup
  items={[
    { id: "notifications", label: "Enable Notifications" },
    { id: "darkMode", label: "Dark Mode" }
  ]}
  onChange={(selectedIds) => updatePreferences(selectedIds)}
/>
```

**Context**: User preference toggles in settings.

## 3. CreatePost.tsx

**Purpose**: Form to create a new community post.

**Props**:
- `onCreate`: (content: string) => void – Handler for post submission.

**Actual Usage** (from /src/pages/Community.tsx):
```tsx
<CreatePost onCreate={(content) => addPost(content)} />
```

**Context**: Community page post creation.

## 4. FileUpload.tsx

**Purpose**: Handles single file uploads.

**Props**:
- `onFileSelected`: (file: File) => void – Callback with selected file.

**Actual Usage** (from /src/pages/Profile.tsx):
```tsx
<FileUpload onFileSelected={(file) => uploadAvatar(file)} />
```

**Context**: Profile picture upload.

## 5. Filter.tsx

**Purpose**: Filters a list of items (e.g., trips/posts).

**Props**:
- `options`: string[] – Filter options (e.g., ["All", "Recent"]).
- `onSelect`: (option: string) => void – Handler for filter selection.

**Actual Usage** (from /src/pages/Trips.tsx):
```tsx
<Filter 
  options={["All", "Upcoming", "Past"]} 
  onSelect={(option) => filterTrips(option)} 
/>
```

**Context**: Trip list filtering.

## 6. InputField.tsx

**Purpose**: Generic text input.

**Props**:
- `placeholder?`: string – Input placeholder text.
- `value`: string – Controlled input value.
- `onChange`: (value: string) => void – Input change handler.

**Actual Usage** (from /src/pages/Register.tsx):
```tsx
<InputField
  placeholder="Email"
  value={email}
  onChange={(value) => setEmail(value)}
/>
```

**Context**: Email input in registration.

## 7. ListedPost.tsx

**Purpose**: Displays a post summary in a list.

**Props**:
- `post`: { id: string; title: string } – Post data.

**Actual Usage** (from /src/pages/Community.tsx):
```tsx
<ListedPost post={{ id: "1", title: "Travel Tips" }} />
```

**Context**: Community post listing.

## 8. Map.tsx

**Purpose**: Displays a static map location.

**Props**:
- `coordinates`: { lat: number; lng: number } – Map center.

**Actual Usage** (from /src/pages/TripDetails.tsx):
```tsx
<Map coordinates={{ lat: 51.505, lng: -0.09 }} />
```

**Context**: Trip location preview.

## 9. PasswordInput.tsx

**Purpose**: Password input with masking.

**Props**:
- `onChange`: (value: string) => void – Input change handler.

**Actual Usage** (from /src/pages/Login.tsx):
```tsx
<PasswordInput onChange={(value) => setPassword(value)} />
```

**Context**: Password field in login.

## 10. SearchBar.tsx

**Purpose**: Search input with debounced queries.

**Props**:
- `onSearch`: (query: string) => void – Search handler.

**Actual Usage** (from /src/pages/Explore.tsx):
```tsx
<SearchBar onSearch={(query) => searchDestinations(query)} />
```

**Context**: Destination search.

## 11. TransportOptions.tsx

**Purpose**: Selector for transportation modes.

**Props**:
- `options`: string[] – Transport types (e.g., ["Car", "Train"]).
- `onSelect`: (option: string) => void – Selection handler.

**Actual Usage** (from /src/pages/NewTrip.tsx):
```tsx
<TransportOptions
  options={["Car", "Train", "Flight"]}
  onSelect={(option) => setTransport(option)}
/>
```

**Context**: Trip transport selection.

