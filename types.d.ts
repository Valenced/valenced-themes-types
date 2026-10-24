/** Discord theme names. */
export type ThemeBase = 'dark' | 'darker' | 'light' | 'midnight';
/** Color values formatted as `#RRGGBB` or `#RRGGBBAA`. */
export interface ThemeColors {
    /** Semantic colors per base. Omitted bases retain Discord colors. */
    semantic?: Partial<Record<ThemeBase, Record<string, string>>>;
    /** Base-independent raw palette colors. */
    raw?: Record<string, string>;
}
/** Group displayed as a section in each picker. Holds themes, fonts, icons, and emoji packs. */
export interface ThemeGroupDefinition {
    name: string;
    description?: string;
}
export interface DiscordColors {
    /** Raw palette colors without theme overrides. */
    raw: Record<string, string>;
}
export interface ThemeBackground {
    /** Image path, relative to the plugin directory or absolute, or an `http(s)` URL. */
    path: string;
    /**
     * Image opacity from 0 to 1, on top of Discord's gradient theme dimming.
     * @default 1
     */
    opacity?: number;
    /** Blur radius. @default 0 */
    blur?: number;
    /**
     * Opacity of surfaces over the image, from 0 to 1.
     * @default 0.7
     */
    dimming?: number;
}
export interface ThemeDefinition {
    name: string;
    description?: string;
    /** Evaluates colors when picked and renders picker previews. */
    getColors(discord: DiscordColors): ThemeColors;
    /** Image behind main screens and chat, which turn translucent like Discord gradient themes. */
    background?: ThemeBackground;
}
export interface FontVariant {
    /** Font file path, relative to the plugin directory or absolute. */
    path: string;
    /** @default 400 */
    weight?: number;
    /** @default false */
    italic?: boolean;
    /**
     * Variable font axis values, such as `{ wght: 600, slnt: -10 }`.
     * Set `wght` for variable fonts, since `weight` only labels the variant.
     */
    axes?: Record<string, number>;
}
export interface FontPackDefinition {
    name: string;
    description?: string;
    /**
     * Maps requested font family name to its variants, such as `ggsans-Normal`.
     * Pass `'system-ui'` to use the device font.
     */
    families: Record<string, FontVariant[] | 'system-ui'>;
}
export interface IconPackDefinition {
    name: string;
    description?: string;
    /** Maps asset name to image file path, relative to plugin directory or absolute. */
    icons: Record<string, string>;
}
/**
 * Replaces Discord Unicode emoji. Both `images` and `font` can be set.
 * Images take precedence, and font renders remaining emoji.
 *
 * Missing emoji fall back to Discord's default font.
 */
export interface EmojiPackDefinition {
    name: string;
    description?: string;
    /**
     * Directory of PNGs named like Discord's, such as `emoji-1f600.png` or `emoji-1f469-200d-2764-fe0f-200d-1f469.png`.
     * Relative to the plugin directory or absolute. Discovers names without `fe0f` automatically.
     */
    images?: string;
    /**
     * Emoji font file path, relative to the plugin directory or absolute.
     * Pass `'system'` to use the device emoji font.
     */
    font?: string;
}
export interface ThemesApi {
    /** Sets group display name. Unset groups show the group ID instead. */
    registerGroup(groupId: string, group: ThemeGroupDefinition): void;
    registerTheme(groupId: string, themeId: string, theme: ThemeDefinition): void;
    registerFontPack(groupId: string, packId: string, pack: FontPackDefinition): void;
    registerIconPack(groupId: string, packId: string, pack: IconPackDefinition): void;
    registerEmojiPack(groupId: string, packId: string, pack: EmojiPackDefinition): void;
}
export interface ColorsSelection {
    plugin: string;
    group: string;
    theme: string;
    values: ThemeColors;
}
export interface FontSource {
    plugin: string;
    group: string;
    pack: string;
    /** A single `system-ui` path stands for the device font. */
    variants: Required<FontVariant>[];
}
export interface FontsSelection {
    /** Maps requested family names (such as `ggsans-Bold`) to providing packs. Omitted families use Discord defaults. */
    families: Record<string, FontSource>;
}
export type FontRole = 'sans' | 'mono';
export interface IconsSelection {
    plugin: string;
    group: string;
    pack: string;
    /** Maps asset name to absolute file path. */
    icons: Record<string, string>;
    /** Maps drawable resource name to absolute file path. */
    drawables: Record<string, string>;
}
export interface EmojiSelection {
    plugin: string;
    group: string;
    pack: string;
    /** Absolute directory path. */
    images?: string;
    /** Absolute font path, or `'system'`. */
    font?: string;
}
export interface BackgroundSettings {
    /** Image source: active color theme's, custom {@link path}, or none (`'none'`). */
    source: 'theme' | 'custom' | 'none';
    /** Absolute image path or `http(s)` URL, for `custom`. */
    path?: string;
    opacity?: number;
    blur?: number;
    dimming?: number;
}
export interface ThemesState {
    format: number;
    colors?: ColorsSelection;
    fonts?: FontsSelection;
    icons?: IconsSelection;
    emoji?: EmojiSelection;
    /** User background settings. Defaults to color theme's background when unset. */
    background?: BackgroundSettings;
}
