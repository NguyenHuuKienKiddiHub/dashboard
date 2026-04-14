export interface SuggestItem {
    id: number
    name: string
    detail_link?: string
}

export interface SchoolPicture {
    lg: string
    md: string
    xs: string
    origin?: string
}

export interface ContactHotline {
    tag: string
    hotline: string
}

export interface ContactPhone {
    tag: string
    phone: string
}

export interface ContactEmail {
    tag: string
    email: string
}

export interface ContactLink {
    tag?: string
    url: string
}

export interface Contact {
    school_id: number
    hotlines: ContactHotline[] | null
    phones: ContactPhone[] | null
    emails: ContactEmail[] | null
    zalo: ContactPhone[] | null
    facebook: ContactLink[] | null
    website: ContactLink[] | null
    deleted_at: string | null
    created_at: string
    updated_at: string
}

export interface Staff {
    id: number
    username: string
}

export interface TeamInfo {
    id: number
    name: string
    leader_id: number
}

export interface TeamMember {
    id: number
    username: string
    team: TeamInfo
    status: number
    userTeamId: number
}

export interface School {
    id: number
    name: string
    address: string
    verify: number
    status: number
    member: number
    type: number
    slug_name: string
    short_name: string | null
    picture: SchoolPicture
    gsp: number
    new_link: number
    saler_id: number
    customer_support_id: number | null
    detail_link: string
    contact: Contact
    saler: Staff
    customer_support: Staff | null
}