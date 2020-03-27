interface Announcement {
  label: "Announcement";
}
interface AnnounceDistribution {
  label: "Announce distribution";
}
interface AnnounceOrder {
  label: "Announce order";
}
interface AnnounceSupport {
  label: "Announce support";
}
interface AnnounceFree {
  label: "Announce free help";
}
interface AnnounceTreatment {
  label: "Announce treatment";
}
interface Mask {
  label: "Mask";
}

export interface Tag {
  tag:
    | Announcement
    | AnnounceDistribution
    | AnnounceOrder
    | AnnounceSupport
    | AnnounceFree
    | AnnounceTreatment
    | Mask;
}
