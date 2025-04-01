# Funnel Preview

A modern, responsive web application for previewing marketing funnels through an intuitive JSON-based interface. The application allows users to upload, view, and interact with funnel configurations in both desktop and mobile views.

![Funnel Preview Demo](path/to/your-demo.gif)

## Features

- 🎨 **Visual Funnel Preview**: Real-time preview of funnel pages with responsive design
- 📱 **Device Switching**: Toggle between desktop and mobile views
- 🧩 **Multiple Block Types**: Support for various content blocks:
  - Text blocks with customizable alignment and styling
  - Image blocks with responsive sizing
  - List blocks for feature presentations
  - Button blocks with customizable styling
- 📄 **Multi-page Support**: Navigate through multiple funnel pages
- 🔄 **JSON Upload**: Easy funnel JSON file upload
- ⚡ **Instant Validation**: Validation of funnel configuration
- 🎯 **Error Handling**: Clear error messages for invalid configurations
- ⌨️ **Keyboard Navigation**: Complete application usability through keyboard controls:
  - Tab navigation for interactive elements
  - Arrow keys for list navigation
  - Enter key for selections and actions

## My Approach

### Planning Phase

#### Requirements Analysis
- Comprehensive breakdown of core functionality:
  - Funnel preview rendering system
  - File upload and validation
  - Error handling and user feedback
- User experience requirements:
  - Intuitive navigation
  - Responsive design
  - Error prevention

#### Research
- React renderer patterns for JSON-to-HTML conversion
- Domain logic organization
- JSON parsing and validation strategies

### Implementation Process

#### Architecture
- **Domain**: Centralized funnel domain logic in a dedicated layer
- **Component-Based Architecture**: Modular UI components for reusability
- **Type-Safe Development**: Comprehensive TypeScript implementation with Zod schema validation
- **Design**: Shared UI component library with consistent styling

#### Technical Challenges & Solutions

1. **Dynamic Block Rendering**
   - Challenge: Creating a flexible system for rendering different block types
   - Solution: Implemented a registry pattern with discriminated unions for type-safe block rendering

2. **Responsive Preview**
   - Challenge: Accurate device-specific previews
   - Solution: Container queries and viewport simulation with dynamic sizing

3. **State Management**
   - Challenge: Managing complex UI state across components
   - Solution: Custom hooks for encapsulated state logic (e.g., `useFunnelPages`, `useListNavigation`)

4. **Error Handling**
   - Challenge: Providing clear feedback for invalid configurations
   - Solution: Comprehensive error handling with Zod validation and user-friendly error messages

## Key Design Decisions

### Desktop Preview Implementation
The current desktop preview implementation dynamically adjusts height to content instead of maintaining a fixed viewport size. This decision was made after encountering significant UX issues:

**Challenge**: Initial implementation with fixed viewport dimensions led to:
- Double vertical scrollbars (one for the preview, one for the page)
- Poor usability on smaller screens
- Difficult content navigation

**Current Solution**: Dynamic height adjustment that:
- Eliminates double scrolling
- Improves overall usability
- Makes content more accessible

**Trade-off**: While this approach improves general usability, it doesn't perfectly simulate fixed viewport dimensions.

**Future Considerations**: 
- Add viewport size controls for custom dimensions
- Implement preview scaling options
- Research zoom functionality for maintaining aspect ratios
- Consider a toggle between fixed and dynamic height modes

## Technologies Used

- **Frontend Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Validation**: Zod
- **Testing**: Vitest with React Testing Library
- **UI Components**: Custom component library and Radix UI primitives

## Code Structure

```
src/
├── libs/
│   ├── funnel/           # Core funnel functionality
│   │   ├── blocks/       # Block implementations
│   │   ├── domain/       # Domain logic and types
│   │   ├── hooks/        # Custom React hooks
│   │   ├── parser/       # JSON parsing logic
│   │   └── renderer/     # Block rendering system
│   ├── ui/              # Shared UI components
│   │   ├── components/   # Reusable UI components
│   │   └── icons/        # SVG icons
│   └── utils/           # Utility functions
└── test/                # Test utilities and setup
```

## Testing Strategy

### Automated Testing
- **Unit Tests**: hooks and utility function testing
- **Integration Tests**: Block rendering and user interactions

### Manual Testing
- **Generated Test Cases**: Used LLMs to generate diverse funnel configurations:
  - Complex multi-page funnels
  - Extreme text lengths and content variations
  - Various color combinations
  - Edge cases for each block type
- **Cross-device Testing**: Verified responsive behavior across different screen sizes
- **Validation Testing**: Tested error handling with malformed JSON files
- **User Flow Testing**: Validated common user interactions and navigation patterns

## Future Improvements

- **Page Management**:
  - Custom page naming
  - Page templates and presets
  - Page duplication and reordering
- **Block Customization**:
  - Expanded style properties for each block type
  - Advanced typography controls
  - Block drag-and-drop reordering
  - Additional block types (video, forms, etc.)
- **Preview Controls**:
  - Customizable viewport dimensions
  - Preview scaling options

## Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/funnel-preview.git

# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run storybook
npm run storybook

# Build for production
npm run build
```