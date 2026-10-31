# Attached (brief)

> Coin agent pack 0.1.78+20 · flagged · full entry: `components/attached.md` (sources, all facts, flags)

Add a subordinate signal to a main item without altering its footprint.

**Use when**
- Add a subordinate signal to a main item without altering its footprint.
- Keep a small qualifier, such as a payment type or status, attached to the item it describes.

**Avoid when**
- Avoid: The extra signal is the item's primary label or would become a second focal point: the badge stays subordinate to the main item.

**Placement**
- The main child owns its size and Attached does not grow the layout footprint for the badge, so give its host enough whitespace for the overhang.
- Leave slack around the composition so the badge can straddle the edge.
- Avoid: Do not clip the host with overflow hidden: the badge overhangs the main bounds and is visibly cut off.
- Keep the qualifier next to the item it describes, as in a payment row.

**Key rules**
- `position`: Use the position choices for where the badge belongs.
- `position`: Use an edge or corner anchor when the badge describes the item, such as the default bottom-right.
- Avoid: `position` = `center`: Avoid the center anchor unless the overlay is deliberate: a centred badge covers the main mark.
- `circular`: For a diagonal (corner) anchor, choose whether it sits on the round child’s edge or on its bounding-box corner.
- `circular` = `true`: Circle edge, circular true (the default), for round marks such as a circular IconCapsule: corner anchors sit on the circle.
- `circular` = `false`: Bounding box, circular false, for a square corner relationship: corner anchors sit on the bounding-box corners.
- Size IconCapsule children with their Icon Capsule Size modes, not style dimensions, so they keep their circular geometry: the guide uses M for the main item and XS for the badge.
- Let the attachment support the item, not obscure it.

**Example:** The guide's composition: a main IconCapsule at its default size with a compact IconCapsule badge (Icon Capsule Size XS) on the default bottom-right anchor, projected onto the circle's edge.

```tsx
<Attached badge={<IconCapsule iconName="ic_rupee" modes={{ 'Icon Capsule Size': 'XS' }} />}>
  <IconCapsule iconName="ic_cart" />
</Attached>
```

**Props:** `style`, `children`, `badge`, `badgeSize`, `badgeRadius`, `position` (center | left | right | top | bottom | top-left | top-right | bottom-left | bottom-right), `circular`, `modes`. (* required)

**Modes it reads:** Attached Border, Color Mode.

Full entry: `components/attached.md`. Links: `components/attached.links.md`.
