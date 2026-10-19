# ClipNest v1.0.2

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
- Search covers title, content, description and tags. Filter by type, favorites, pinned, category, tag; sort via the sort icon.
- Tap the copy icon to copy exact content. "Copied!" appears only on success; otherwise you get a select-and-copy fallback.
- Delete moves items to Trash (restore, delete forever, empty Trash — both ask for confirmation).
- Settings: theme (System/Light/Dark), palette, accent colour, default view/sort, category rename, backup.

## Storage limitations
Data lives in this browser's IndexedDB. It can be lost if site data is cleared, in private browsing, or when you change browser/device. **Export a backup regularly** (Settings > Data and backup). Imports are validated and previewed before anything changes; duplicates can be skipped or kept.

## Known limitations
No sync, background clipboard history, AI, OCR/attachments, or sharing in this version.

## Changelog
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

## Planned changes (not built yet)
### Batch 3 - Settings
- Trash moves into Settings (under Data and backup) as a row with the item count.
- Settings becomes a full-screen phone panel: sticky title and Done button, larger touch targets, no sideways overflow.
