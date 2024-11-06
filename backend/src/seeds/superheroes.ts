import { type Knex } from 'knex';

const superheroesData = [
    {
        nickname: 'Superman',
        realName: 'Clark Kent',
        originDescription:
            'He was born Kal-El on the planet Krypton, before being rocketed to Earth as an infant by his scientist father Jor-El, moments before Krypton`s destruction...',
        superpowers:
            'Solar energy absorption and healing factor, solar flare and heat vision, solar invulnerability, flight...',
        catchPhrase:
            'Look, up in the sky, it`s a bird, it`s a plane, it`s Superman!',
    },
    {
        nickname: 'Batman',
        realName: 'Bruce Wayne',
        originDescription:
            'After witnessing his parents’ murder as a child, Bruce Wayne swore vengeance on criminals and trained himself to become the world’s greatest detective and martial artist.',
        superpowers:
            'Genius-level intellect, peak human physical condition, expert detective, vast wealth, and advanced technology gadgets.',
        catchPhrase: 'I am vengeance. I am the night. I am Batman!',
    },
    {
        nickname: 'Wonder Woman',
        realName: 'Diana Prince',
        originDescription:
            'Princess of the Amazonian people on Themyscira, Diana was gifted with powers by the Greek gods to bring peace and justice to the world of men.',
        superpowers:
            'Superhuman strength, agility, speed, flight, divine wisdom, indestructible bracelets, and the Lasso of Truth.',
        catchPhrase:
            'In a world of ordinary mortals, you are a wonder, Wonder Woman.',
    },
    {
        nickname: 'Spider-Man',
        realName: 'Peter Parker',
        originDescription:
            'After being bitten by a radioactive spider, Peter Parker gained incredible powers and vowed to use them to protect others after his uncle’s death taught him the value of responsibility.',
        superpowers:
            'Wall-crawling, super strength, agility, enhanced reflexes, and spider-sense.',
        catchPhrase: 'With great power comes great responsibility.',
    },
    {
        nickname: 'Iron Man',
        realName: 'Tony Stark',
        originDescription:
            'A billionaire genius and inventor who built a powerful suit of armor to escape captivity and now uses it to protect the world.',
        superpowers:
            'Powered armored suit with flight, super strength, energy repulsors, and a vast array of high-tech weapons.',
        catchPhrase: 'I am Iron Man.',
    },
    {
        nickname: 'The Flash',
        realName: 'Barry Allen',
        originDescription:
            'Struck by lightning while working in a crime lab, Barry gained super-speed and dedicated himself to fighting crime as The Flash.',
        superpowers:
            'Super speed, time travel, phasing through objects, and accelerated healing.',
        catchPhrase:
            'Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.',
    },
    {
        nickname: 'Thor',
        realName: 'Thor Odinson',
        originDescription:
            'The Norse God of Thunder, Thor was exiled to Earth by his father, Odin, to learn humility, eventually becoming a protector of humanity.',
        superpowers:
            'Superhuman strength, weather manipulation, flight via Mjölnir, lightning summoning, and immortality.',
        catchPhrase: 'For Asgard!',
    },
    {
        nickname: 'Green Lantern',
        realName: 'Hal Jordan',
        originDescription:
            'Given a power ring by a dying alien Green Lantern, Hal became part of the intergalactic peacekeeping Green Lantern Corps.',
        superpowers:
            'Power ring granting energy constructs, flight, force fields, and universal translation.',
        catchPhrase:
            'In brightest day, in blackest night, no evil shall escape my sight!',
    },
    {
        nickname: 'Captain America',
        realName: 'Steve Rogers',
        originDescription:
            'A frail young man turned into the peak of human potential by the Super Soldier Serum during WWII, Steve Rogers fights for justice as Captain America.',
        superpowers:
            'Enhanced strength, agility, endurance, and a near-indestructible shield.',
        catchPhrase: 'I can do this all day.',
    },
    {
        nickname: 'Wolverine',
        realName: 'Logan',
        originDescription:
            'Mutated with enhanced senses and a healing factor, Logan was later given an indestructible adamantium skeleton, making him one of the most resilient mutants.',
        superpowers:
            'Superhuman senses, healing factor, retractable adamantium claws, and combat skills.',
        catchPhrase:
            'I’m the best there is at what I do, but what I do isn’t very nice.',
    },
    {
        nickname: 'Doctor Strange',
        realName: 'Stephen Strange',
        originDescription:
            'A brilliant surgeon whose hands were crippled in an accident, Stephen learned the mystic arts to heal himself and became Earth’s Sorcerer Supreme.',
        superpowers:
            'Mastery of sorcery, energy projection, teleportation, and time manipulation.',
        catchPhrase: 'By the Hoary Hosts of Hoggoth!',
    },
    {
        nickname: 'Black Panther',
        realName: 'T’Challa',
        originDescription:
            'King of Wakanda, a technologically advanced African nation, T’Challa gains his powers from the mystical Heart-Shaped Herb.',
        superpowers:
            'Enhanced strength, agility, senses, and a Vibranium suit.',
        catchPhrase: 'Wakanda Forever!',
    },
    {
        nickname: 'Aquaman',
        realName: 'Arthur Curry',
        originDescription:
            'The half-Atlantean, half-human king of Atlantis, Arthur protects both land and sea, fighting threats from above and below the ocean.',
        superpowers:
            'Super strength, aquatic telepathy, water manipulation, and underwater endurance.',
        catchPhrase: 'The sea has chosen me.',
    },
    {
        nickname: 'Daredevil',
        realName: 'Matt Murdock',
        originDescription:
            'Blinded by a radioactive substance as a child, Matt’s remaining senses were heightened, allowing him to fight crime as a vigilante.',
        superpowers:
            'Heightened senses, radar sense, expert in martial arts, and acrobatics.',
        catchPhrase: 'Justice is blind.',
    },
    {
        nickname: 'Scarlet Witch',
        realName: 'Wanda Maximoff',
        originDescription:
            'A mutant with reality-altering powers, Wanda constantly battles between her responsibilities as a hero and the immense power she possesses.',
        superpowers:
            'Chaos magic, reality warping, telekinesis, and mind control.',
        catchPhrase: 'We each define our own limits.',
    },
    {
        nickname: 'Green Arrow',
        realName: 'Oliver Queen',
        originDescription:
            'Stranded on a deserted island, billionaire Oliver Queen mastered archery and returned to Star City to fight crime as the Green Arrow.',
        superpowers:
            'Master archer, expert in hand-to-hand combat, and uses a wide variety of trick arrows.',
        catchPhrase: 'I am the Green Arrow.',
    },
];

const TableName = 'superheroes';

async function seed(knex: Knex): Promise<void> {
    await knex(TableName).del();

    await knex(TableName).insert(superheroesData);
}

export { seed };
