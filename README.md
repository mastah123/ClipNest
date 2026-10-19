# ClipNest v1.0.12

*Save it once. Find it fast. Copy it anytime.*

A local-first snippet manager. Vanilla HTML/CSS/JS, no build step, no backend, no accounts, no network calls.

## Run it
- Quickest: open `index.html` in a modern browser.
- Recommended (most reliable storage and clipboard): serve the folder locally, e.g. `python3 -m http.server 8000`, then visit http://localhost:8000.
- Clipboard reading (Quick Paste) needs a secure context (https or localhost) and your permission; otherwise a paste box is shown.

## Files
- `index.html` – page shell
- `styles.css` – all styling and themes
- `logo.svg` – app logo and favicon
- `js/config.js` – version constant (`VER`), icons, helpers, state
- `js/db.js` – IndexedDB data layer
- `js/detect.js` – rule-based type and title detection
- `js/helpers.js` – dialogs, theme, copy, snippet actions
- `js/form.js` – capture/edit form
- `js/render.js` – list, chips, controls
- `js/backup.js` – JSON import/export
- `js/settings.js` – settings panel
- `js/main.js` – startup

Change the version in one place: `VER` in `js/config.js`.

## Usage
- **Search icon** (top right on phones) opens the search field. Your search stays active when the field is closed; a dot on the icon shows it.
- **Paste** (floating button) reads your clipboard only when tapped and saves it at once as paste-1, paste-2, ...; if the clipboard is blocked you get a paste box instead. **+** (above Paste) adds a snippet by hand.
- Search covers title, content and description. Use the menu for type, favorites, pinned and folders, and the sort icon to sort.
- Tap the copy icon to copy exact content. "Copied!" appears only on success; otherwise you get a select-and-copy fallback.
- Delete moves items to Trash, found in Settings > Data and backup (restore, delete forever, empty Trash — both ask for confirmation).
- Settings: theme (System/Light/Dark), backup.

## Storage limitations
Data lives in this browser's IndexedDB. It can be lost if site data is cleared, in private browsing, or when you change browser/device. **Export a backup regularly** (Settings > Data and backup). Imports are validated and previewed before anything changes; duplicates can be skipped or kept.

## Known limitations
No sync, background clipboard history, AI, OCR/attachments, or sharing in this version.

## Changelog
### 1.0.12 - Add/Edit form (batch 4 of the cleanup)
- The New/Edit snippet form is a full-screen panel on phones and a centred dialog on desktop. The title stays at the top, Cancel and Save stay fixed at the bottom (validation messages show there too), and only the fields in between scroll.
- The content box wraps long lines instead of scrolling sideways. This is display only: no line breaks are added, so saved and copied text is exactly what you typed.
- "Write manually" (after a Paste fallback) moved to the top of the fields.

### 1.0.11 - Settings, About and labels (batch 3 of the cleanup)
- Settings has three clean sections: Appearance (System / Light / Dark), Data (Export and Import buttons plus one line warning that browser data can be erased) and About.
- Removed Copy JSON, the paste-JSON box and the storage estimate. Import now picks a backup file only (still validated and previewed before anything changes).
- About is a styled card: logo, name, version, tagline, one-line description and "On this device / No account" badges.
- Removed unnecessary labels: the "Detected: ..." hint and "(optional)" suffixes in the form, the Trash note, and the longer empty-state and folder messages.

### 1.0.10 - Tags and Settings options (batch 2 of the cleanup)
- Removed all tag features: the form field, search by tag, the tag dropdown and tags on details. Snippets saved earlier keep any stored tags in their data, but the app ignores them; new snippets and imports don't use tags.
- Settings no longer has Default view or Default sorting. The grid/list and sort icons on the home screen stay, and the app remembers your last choice automatically.
- Appearance is now just System, Light and Dark. Palettes and the custom accent colour were removed (the logo blue is always used; old palette/accent choices are cleared).

### 1.0.9 - Home screen (batch 1 of the cleanup)
- The header is now just the menu button (left) and the search icon (right): no logo, name or tagline. The logo and name remain at the top of the menu.
- On phones the menu slides in from the left. On wide screens it is still the permanent left sidebar, and the search field sits at the top of the page.
- Removed the "Your library" heading and the "Tap a snippet..." hint. Tapping a snippet card still copies it. The Trash view keeps its "Trash" title.

### 1.0.8 - Paste and "+" (batch 3 of the menu redesign)
- **Paste** (floating, lower right) now saves immediately: it reads the clipboard once, detects the type, and saves the snippet as `paste-1`, `paste-2`, ... using the lowest unused number (Trash is counted, so a restored item never clashes). The content is stored exactly as copied. Rename or retype it later from the card's › menu > Edit.
- If the clipboard can't be read or is empty, nothing is saved: a paste form opens (pre-titled with the next paste-N) and says so. If identical content already exists you are offered "Open existing" or "Save anyway".
- New floating **+** above Paste opens the manual entry form.
- The old Quick Paste card (desktop) was removed; both buttons float on every screen size.

### 1.0.7 - Menu (batch 2 of the menu redesign)
- New menu button at the top right (replaces the Settings button). On phones it slides in from the right; on screens 900px and wider it is a permanent sidebar on the left and the header is hidden.
- Menu layout: fixed logo + "ClipNest" header; scrollable type list (All, Pinned, Favorites, URL, Code, Command, Prompt, Email, Text, with counts); a fixed-height Folders section with a "Show all" link that opens a full-screen folders page (create, open, rename, delete); Trash and Settings fixed at the bottom.
- The filter button and folder chips were removed from the main screen. Active type/folder filters show as small removable pills under the library heading. Search is unchanged (icon in the header on phones).
- Trash moved from Settings into the menu.

### 1.0.6 - Logo-matched look (batch 1 of the menu redesign)
- New default palette "Logo blue" taken from the logo (navy `#3F5D83`, light blues, near-white surfaces). Cream and Sage remain as options; Dark mode is now blue-toned. The old Blue palette was replaced by Logo blue.
- Type colours (URL, Code, Command, Prompt, Email, Text) and folder chip colours are now a cool blue/teal/indigo family so they sit with the logo; icons rely on shape and the text label, not colour alone.
- Icons use a slightly heavier stroke with rounded caps and joins, and icon tiles get a soft outline, echoing the logo.
- Typography uses a rounded system font stack (SF Pro Rounded / ui-rounded where the device has it, otherwise the normal system font) and the ClipNest title takes the brand navy. No web fonts are loaded.

### 1.0.5
- New logo (`logo.svg`) used in the header and as the browser tab icon.

### 1.0.4 - Folder layout
- New top row: a filter button (opens the type list: All, URL, Code, Command, Prompt, Email, Text, Favorites, Pinned, with counts), folder chips with name and count, and a "More" button for managing folders.
- Folders are the old "categories": pick one in the snippet form (now labelled Folder). More lets you create, open, rename and delete folders. Deleting a folder keeps its snippets (they just have no folder). Empty folders and folder names are included in JSON backups.
- Cards redesigned: icon, title and type (URLs show the link). **Tap a card to copy it**; tap the chevron for details (preview, description, tags, folder), Edit, Duplicate, Favorite, Pin and Trash. Favorites and pins show as small icons on the card.
- The category dropdown and the category rename section in Settings were removed (replaced by folders).

### 1.0.3 - Mobile batch 3
- Trash moved into Settings > Data and backup (a row with the item count). Restore, delete forever and Empty Trash work as before; "← Library" returns from the Trash view.
- Settings is a full-screen panel on phones with a sticky title and Done button, larger touch targets, evenly sized option buttons, no sideways overflow, and it keeps its scroll position when you change an option.

### 1.0.2 - Mobile batch 2
- Paste is now a floating button in the lower right on phones (the Quick Paste card remains on desktop).
- Grid/list is one icon button that shows the current view; tap it to switch.
- Removed the "+" button. After tapping Paste, a "Write manually" button in the dialog clears the pasted text so you can type a snippet from scratch (the dialog is also a normal editable form).
- Sort is an icon beside grid/list that opens a sheet with the five sort options (the old dropdown is gone).

### 1.0.1 - Mobile batch 1
- Header is fixed at the top and more compact; the whole phone layout is slightly smaller and less cramped.
- Search is now an icon beside Settings that opens the search field under the header (always visible on desktop).
- Filter chips (All, URL, Code, ...) are one horizontally scrollable row on phones.

### 1.0.0
- First complete release: capture, detection, search, filters, sorting, categories/tags, Trash, JSON backup, themes.

## Planned changes
None queued. Add new requests here as they come in.
