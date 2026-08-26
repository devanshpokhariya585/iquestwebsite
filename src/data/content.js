// All copy lives here so components stay presentational.
// Swap values or fetch from your Express API without touching the UI.

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Team', href: '#team' },
  { label: 'Newsletter', href: '#newsletter' },
]

export const hero = {
  status: '',
  title1: 'INNOVATORS',
  title2: 'QUEST',
  tagline: 'IGNITING INNOVATION',
  scrollHint: 'SCROLL TO BOOT',
}

export const about = {
  eyebrow: '01 · ABOUT',
  heading: 'WHO WE ARE',
  lead:
    'A community of curious minds, building innovative solutions and shaping the future through technology.',
  prompt: 'Click the processor to power up the core',
  core: {
    heading: 'INNOVATORS QUEST',
    text:
      'We are builders, tinkerers and dreamers. From late-night hackathons to open-source projects, Innovators Quest is where ideas get compiled into reality.',
    stats: [
      { value: '100+', label: 'Members' },
      { value: '50+', label: 'Projects' },
      { value: '25+', label: 'Events' },
      { value: '10+', label: 'Research Papers' },
    ],
  },
}

export const events = {
  eyebrow: '02 · EVENTS',
  heading: 'WHAT’S NEXT',
  subheading: 'Upcoming missions on the calendar.',
  list: [
    { id: 'q', tag: 'WORKSHOP', title: 'WANNA CRACK GSOC', date: 'SEP 18', time: '10:00 AM - 4:00 PM', location: 'PRP AUDITORIUM-2', status: 'REGISTERING',link: 'https://gravitas.vit.ac.in/events/ff0d04aa-c637-4a0f-ac52-6c56490509c3' },
    { id: 'ai', tag: 'SHOWCASE', title: 'TRAIL OF SECRETS', date: 'SEP 19', time: '10:00 AM – 4:00 PM', location: 'SJT-307', status: 'REGISTERING', link: "https://gravitas.vit.ac.in/events/e9a6ffc2-c301-4c9e-aece-72078993be23"},

  ],
}

export const footer = {
  tagline: 'Building your bridge to the future, one commit at a time.',
  columns: [
    { title: 'Explore', links: [
      { label: 'About', href: '#about' },
      { label: 'Events', href: '#events' },
      { label: 'Projects', href: '#' },
      { label: 'Open Source', href: '#' },
    ] },
    { title: 'Community', links: [
      { label: 'Join Us', href: '#newsletter' },
      { label: 'Discord', href: '#' },
      { label: 'Code of Conduct', href: '#' },
      { label: 'Contact', href: '#' },
    ] },
  ],
  socials: ['GitHub', 'Discord', 'Instagram', 'LinkedIn'],
}

export const marquee = [
  'IGNITING INNOVATION',
  'BUILD · SHIP · REPEAT',
  'HACKATHONS',
  'OPEN SOURCE',
  'WORKSHOPS',
  'DEMO NIGHTS',
  'CURIOUS MINDS',
]

export const capabilities = {
  eyebrow: '02 · WHAT WE DO',
  heading: 'THE STACK',
  subheading: 'Five circuits, one mission — turning ideas into shipped reality.',
  items: [
    { icon: 'Code2', title: 'Technical', text: 'Build innovative solutions through code, technology, and problem-solving.' },
    { icon: 'Settings', title: 'Management', text: 'Plan, organize, and execute events that bring ideas to life.' },
    { icon: 'Palette', title: 'Design', text: 'Turn ideas into engaging visuals, experiences, and creative identities.' },
    { icon: 'Cpu', title: 'Electrical and Electronics', text: 'Explore circuits, hardware, embedded systems, and emerging technology.' },
    { icon: 'Newspaper', title: 'Editorial', text: 'Create compelling content that informs, inspires, and connects our community.' },
  ],
}

export const impact = {
  eyebrow: '04 · OUR IMPACT',
  heading: 'BY THE NUMBERS',
  stats: [
    { value: 100, suffix: '+', label: 'Active Members' },
    { value: 50, suffix: '+', label: 'Projects Shipped' },
    { value: 25, suffix: '+', label: 'Events Hosted' },
    { value: 15, suffix: '+', label: 'Workshops' },
    { value: 10, suffix: '+', label: 'Research Papers' },
  ],
}

export const team = {
  eyebrow: '05 · OUR TEAM',
  heading: 'THE MINDS',
  subheading: 'The people behind the mission.',
  // Photos: drop a file at public/team/<slug>.jpg (slug = lowercased name with
  // dashes, e.g. "Devansh Pokhariya" -> devansh-pokhariya.jpg). Missing photos
  // fall back to the initials badge automatically.(dear board ,next time jab add karo toh dhyan rakhna)
  members: [
    { name: 'Swagata Banerjee', role: 'Chairperson', initials: 'SB', bio: 'Leads Innovators Quest with vision and drive.' },
    { name: 'Aryan Vaity', role: 'Vice Chairperson', initials: 'AV', bio: 'Keeps the mission on track and the team aligned.' },
    { name: 'Hanniel Vinu', role: 'Secretary', initials: 'HV', bio: 'The organizer who keeps everything running.' },
    { name: 'Ardhra M P', role: 'Co Secretary', initials: 'AMP', bio: 'Coordinates the crew behind the scenes.' },
    { name: 'Devansh Pokhariya', role: 'Technical Head', initials: 'DP', bio: 'Builds and ships the tech that powers the club.' },
    { name: 'Hadeeqa Kouser M', role: 'Design Head', initials: 'HKM', bio: 'Crafts the look and feel of everything we make.' },
    { name: 'Himangi Goyal', role: 'Finance Head', initials: 'HG', bio: 'Keeps the numbers and the budget in check.' },
    { name: 'Siddharth Agarwal', role: 'Events Head', initials: 'SA', bio: 'Shapes bold visuals and experiences.' },
    { name: 'Shreya Saravanan', role: 'PR Head', initials: 'SS', bio: 'Tells our story and grows the community.' },
    { name: 'Nitin Pandey', role: 'Management Head', initials: 'NP', bio: 'Makes events and operations happen.' },
  ],
}

// Recruitment is a SEPARATE website , set its URL here. The button opens it in a new tab.

export const RECRUITMENT_URL = 'https://your-recruitment-site.com'

// Upcoming events (dated, for the calendar page)
export const upcomingEvents = [
  { id: 'u1', date: '2026-09-18', title: 'WANNA CRACK GSOC 3.0', tag: 'WORKSHOP', time: '10:00 AM to 4:00 PM', location: 'PRP Auditorium-2' },
  { id: 'u2', date: '2026-09-19', title: 'TRAIL OF SECRETS', tag: 'SHOWCASE', time: '10:00AM – 4:00 PM', location: 'SJT 307' },
]

//  Past events (recaps)
export const pastEvents = [
  { id: 'p1', date: '2026-02-7', year: '2026', title: 'CYBERSHIELD X', tag: 'WORKSHOP', attendees: 50, blurb: '' },
  { id: 'p2', date: '2026-03-5', year: '2026', title: 'SUSTAIN-A-THON', tag: 'IDEATHON', attendees: 45, blurb: '' },
  
]



