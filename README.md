# ClipNest v1.0.4

*Save it once. Find it fast. Copy it anytime.*

A local-first snippet manager. Vanilla HTML/CSS/JS, no build step, no backend, no accounts, no network calls.

## Run it
- Quickest: open `index.html` in a modern browser.
- Recommended (most reliable storage and clipboard): serve the folder locally, e.g. `python3 -m http.server 8000`, then visit http://localhost:8000.
- Clipboard reading (Quick Paste) needs a secure context (https or localhost) and your permission; otherwise a paste box is shown.

## Files
- `index.html` – page shell
- `styles.css` – all styling and themes
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
- **Paste** (floating button) reads your clipboard only when tapped; if blocked, paste into the box shown. Use **Write manually** in that dialog to type a snippet from scratch.
- Search covers title, content, description and tags. Use the filter button for type/favorites/pinned, folder chips for folders, the tag dropdown for tags, and the sort icon to sort.
- Tap the copy icon to copy exact content. "Copied!" appears only on success; otherwise you get a select-and-copy fallback.
- Delete moves items to Trash, found in Settings > Data and backup (restore, delete forever, empty Trash — both ask for confirmation).
- Settings: theme (System/Light/Dark), palette, accent colour, default view/sort, category rename, backup.

## Storage limitations
Data lives in this browser's IndexedDB. It can be lost if site data is cleared, in private browsing, or when you change browser/device. **Export a backup regularly** (Settings > Data and backup). Imports are validated and previewed before anything changes; duplicates can be skipped or kept.

## Known limitations
No sync, background clipboard history, AI, OCR/attachments, or sharing in this version.

## Changelog
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
