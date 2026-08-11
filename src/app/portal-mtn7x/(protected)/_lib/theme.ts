// Validated palette (see dataviz skill / scripts/validate_palette.js).
// Categorical: fixed order, never cycled/reassigned when filters change series count.
export const CATEGORY_COLORS: Record<string, string> = {
  "black-gold": "#c98500",
  "blue-gold": "#3987e5",
  "red-gold": "#d95926",
  "white-gold": "#199e70",
};

export const CATEGORY_COLOR_ORDER = ["#3987e5", "#d95926", "#199e70", "#c98500"];

// Status palette: fixed roles, never reused for series identity.
export const STATUS_COLORS = {
  READY: "#0ca30c",
  SOLD_OUT: "#d03b3b",
  DISCONTINUED: "#fab219",
} as const;

export const STATUS_LABEL_ID: Record<string, string> = {
  READY: "Ready",
  SOLD_OUT: "Sold Out",
  DISCONTINUED: "Discontinued",
};

export const PACKAGING_LABEL: Record<string, string> = {
  SATUAN: "Satuan",
  CARD_BOX: "Card Box",
  WOODEN_BOX: "Wooden Box",
};
