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
    { id: 'q', tag: 'HACKATHON', title: 'Quantum Hack 48', date: 'SEP 12', time: '48-hour sprint', location: 'Main Lab · Block C', status: 'REGISTERING' },
    { id: 'ai', tag: 'WORKSHOP', title: 'Neural Nets from Scratch', date: 'SEP 20', time: '5:00 – 8:00 PM', location: 'Room 204 · Online', status: 'REGISTERING' },
    { id: 'oss', tag: 'OPEN SOURCE', title: 'First-PR Friday', date: 'SEP 27', time: '3:00 – 6:00 PM', location: 'Innovation Hub', status: 'FEW SEATS' },
    { id: 'demo', tag: 'SHOWCASE', title: 'Demo Night · Vol. 07', date: 'OCT 04', time: '6:30 PM onward', location: 'Auditorium A', status: 'RSVP OPEN' },
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
    { icon: 'Code2', title: 'Projects', text: 'Real ideas, real impact. We build things people use.' },
    { icon: 'Trophy', title: 'Events', text: 'Tech events that inspire, challenge and connect.' },
    { icon: 'Rocket', title: 'Workshops', text: 'Hands-on learning, well beyond the classroom.' },
    { icon: 'Users', title: 'Community', text: 'United by passion, driven by purpose.' },
    { icon: 'GitBranch', title: 'Open Source', text: 'Build. Contribute. Give back to the commons.' },
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
  { id: 'u1', date: '2026-08-12', title: 'Quantum Hack 48', tag: 'HACKATHON', time: '48-hour sprint', location: 'Main Lab · Block C' },
  { id: 'u2', date: '2026-08-20', title: 'Neural Nets from Scratch', tag: 'WORKSHOP', time: '5:00 – 8:00 PM', location: 'Room 204 · Online' },
  { id: 'u3', date: '2026-08-27', title: 'First-PR Friday', tag: 'OPEN SOURCE', time: '3:00 – 6:00 PM', location: 'Innovation Hub' },
  { id: 'u4', date: '2026-09-04', title: 'Demo Night · Vol. 07', tag: 'SHOWCASE', time: '6:30 PM', location: 'Auditorium A' },
  { id: 'u5', date: '2026-09-15', title: 'Cloud Native Bootcamp', tag: 'WORKSHOP', time: '10:00 AM – 4:00 PM', location: 'Lab 3' },
  { id: 'u6', date: '2026-09-23', title: 'AI Agents Meetup', tag: 'MEETUP', time: '5:30 PM', location: 'Seminar Hall' },
  { id: 'u7', date: '2026-10-05', title: 'Hacktoberfest Kickoff', tag: 'OPEN SOURCE', time: 'All day', location: 'Innovation Hub' },
  { id: 'u8', date: '2026-10-18', title: 'Design Systems Jam', tag: 'WORKSHOP', time: '2:00 – 6:00 PM', location: 'Studio B' },
]

//  Past events (recaps)
export const pastEvents = [
  { id: 'p1', date: '2026-05-10', year: '2026', title: 'WANNA CRACK GSOC', tag: 'WORKSHOP', attendees: 140, blurb: '' },
  { id: 'p2', date: '2026-03-22', year: '2026', title: 'Intro to Rust', tag: 'WORKSHOP', attendees: 95, blurb: '' },
  { id: 'p3', date: '2026-02-14', year: '2026', title: 'Open Source Day', tag: 'OPEN SOURCE', attendees: 140, blurb: '' },
  { id: 'p4', date: '2025-11-30', year: '2025', title: 'Demo Night · Vol. 06', tag: 'SHOWCASE', attendees: 300, blurb: '' },
  { id: 'p5', date: '2025-10-12', year: '2025', title: 'ML Winter Camp', tag: 'BOOTCAMP', attendees: 110, blurb: '' },
  { id: 'p6', date: '2025-09-05', year: '2025', title: 'Founders Fireside', tag: 'TALK', attendees: 180, blurb: '' },
]



