// global parameters
let activeTab = null,
  playerToUpdate = null,
  selectedRowsObj = null,
  positionNeedsObj = null;

const drPlayerStatus = ["unset", "draft", "free agent", "trade"];
const drPositions = {
  qb: { name: "quarterback" },
  hb: { name: "halfback" },
  fb: { name: "fullback" },
  wr: { name: "wide receiver" },
  te: { name: "tight end" },
  t: { name: "tackle" },
  g: { name: "guard" },
  c: { name: "center" },
  de: { name: "defensive end" },
  dt: { name: "defensive tackle" },
  olb: { name: "outside linebacker" },
  mlb: { name: "middle linebacker" },
  cb: { name: "cornerback" },
  fs: { name: "free safety" },
  ss: { name: "strong safety" },
  k: { name: "kicker" },
  p: { name: "punter" },
};
const drPosJ21Advice = {
  qb: {
    copy: `<ul> <li>When drafting a guy, THP and at least decent AWR/THA are a must</li> <li>SPD and CAR can be factors if the QB isn't exactly a highly accurate guy</li> <li>AWR (From experience, this has a slight effect on accuracy. Also, since I play with the QB Vision Cone ON, high Awareness is useful)</li> </ul>`,
  },
  hb: {
    copy: `<p>Really depends on what scheme I'm rolling and what backs I have on my roster, but I generally split them by:</p> <ul> <li>Elusive Back: AGI, ACC, AWR, SPD, CTH, CAR</li> <li>Power Back: BTK, CAR, AWR</li> </ul> <p>If they have 70+ STR and 50+ PBK, that gives them a bonus, since they can pickup blitzes. 70+ CTH is also good.</p>`,
  },
  fb: {
    copy: `<ul> <li>When I do get one, they must have solid RBK and STR OR solid CTH.</li> <li>Either they are solid lead blockers, or they are solid receiving backs. Or both.</li> </ul>`,
  },
  wr: {
    copy: `<p>I usually have one or two guys that are solid all around, and multiple situational/role players here.</p> <p>My #1 and #2 need solid athletic ability (88+ in SPD, AGI and ACC, preferably more) and great CTH (92+) and AWR (92+).</p> <p>JMP is up for grabs with these guys, although it helps. Same with CAR and BTK.</p> <p>Since I tend to have 6 WRs in my roster, I have:</p> <ul> <li>At least 2 slot receivers (High AGI kind of guys with high ACC too for good measure, usually one of my top 2 receivers can play in the slot, and tends to do)</li> <li>At least a tall, Red Zone receiver (90+ JMP, 6'2'' or more. AGI is not too important as they usually line up on the outside)</li> <li>1 or 2 chains moving possession receiver (Can be both of my top 2 receivers or my slot receiver)</li> <li>The 6th guy is a backup that could develop into a decent or good starter, or an amazing returner. Sheer Athleticism or sheer skill and awareness are the driving factors when it comes to drafting.</li> </ul>`,
  },
  te: {
    copy: `<p>I look for Possession TEs so SPD isn't a big deal. JMP is, as it is CTH.</p> <p>My #1 and #2 TEs must be solid receivers on their own, with some ability to block.</p> <p>The #3 either needs solid CTH as well, or preferably great RBK and STR.</p>`,
  },
  t: {
    copy: `<ul> <li>The top factors for LT are PBK, STR, RBK, AWR</li> <li>For RT the order is RBK, STR, PBK, AWR</li> <li>SPD doesn't apply to them unless you want them to pull somehow (There are playbooks that have plays with pulling tackles)</li> <li>ACC and AGI help a bit, the first with getting push at the line, the other at dealing with speed rushers</li> <li>For draftees, I focus on STR and at least decent PBK/RBK</li> </ul>`,
  },
  g: {
    copy: `<ul> <li>I focus on STR, RBK, PBK, AWR, SPD, ACC</li> <li>SPD does play a part here as they do pull</li> <li>ACC once again helps getting push at the line, AGI helps with twists, as does AWR</li> <li>On draftees I focus on STR once again</li> </ul>`,
  },
  c: {
    copy: `<ul> <li>For them I focus on STR, AWR, PBK, RBK</li> <li>Unless you have a playbook where the C pulls, SPD is irrelevant</li> <li>ACC helps at the line, AGI ... in their case it doesn't help much</li> <li>AWR helps with blocking extra rushers</li> <li>For draftees, I focus on STR and at least decent PBK/RBK</li> </ul>`,
  },
  de: {
    copy: `<p>If I run a 3-4, I want STR (Think 90+), AWR and TAK for my DEs.</p> <p>In a 4-3, it depends:</p> <ul> <li>For my LE, I want STR (80+ does the trick here), AWR and TAK, with decent AGI and ACC</li> <li>For my RE, I want AGI, ACC, SPD (For these 3, high 70s to low 80s does the trick), AWR, TAK</li> <li>LEs are run stoppers, REs are speed rushers</li> </ul>`,
  },
  dt: {
    copy: `<p>For 3-4: You want a massive guy with STR (94+) and TAK, along with AWR.</p> <p>For 4-3: You can slack a bit in STR (Still try for 90+, although the high 80s do the trick) for some AGI and ACC (High 50s to low 60s is good enough for DTs).</p>`,
  },
  olb: {
    copy: `<p>In a 3-4, both OLBs need to fit the mold a 4-3 RE would fit:</p> <ul> <li>High SPD, AGI, ACC (in the 80s range), TAK and AWR</li> <li>STR can be useful for run stopping</li> </ul> <p>In a 4-3, both OLBs would be similar to the MLB:</p> <ul> <li>Solid AWR (80+), decent TAK, solid athleticism</li> </ul>`,
  },
  mlb: {
    copy: `<p>I run with at least 4 MLBs in my roster (When I use the 3-4 that is):</p> <ul> <li>The first two need to distinguish themselves with solid AWR, solid TAK (80+ in both) and decent athleticism</li> <li>The 3rd must be like the first 2, just with less AWR</li> <li>The 4th must be a highly athletic guy, as he is the pass coverage LB. TAK and AWR isn't as important with this guy, he just needs to keep up with HBs and TEs.</li> </ul>`,
  },
  cb: {
    copy: `<p>This depends on what kind of coverage you run the most:</p> <ul> <li>Zone: Prioritize AGI, ACC, SPD and AWR</li> <li>Man: Prioritize AWR, SPD, ACC, AGI</li> <li>CTH is always useful, as is TAK</li> </ul>`,
  },
  fs: {
    copy: `<ul> <li>I usually prefer a more athletic, rangier guy at FS (So SPD, AGI, ACC, AWR, TAK)</li> <li>And box safety at SS (TAK, ACC, AWR, AGI, SPD)</li> </ul> <p>Usually, I want my safeties to serve in Big Nickel and Big Dime sets (3 Safeties sets), so I have 1 or 2 guys that can play FS reliably.</p>`,
  },
  ss: {
    copy: `<ul> <li>I usually prefer a more athletic, rangier guy at FS (So SPD, AGI, ACC, AWR, TAK)</li> <li>And box safety at SS (TAK, ACC, AWR, AGI, SPD)</li> </ul> <p>Usually, I want my safeties to serve in Big Nickel and Big Dime sets (3 Safeties sets), so I have 1 or 2 guys that can play FS reliably.</p>`,
  },
  k: {
    copy: `<p>Your first priority should be KPW, followed by AWR and THEN KAC</p> <p>Low Awareness has a serious effect on kicking ability, specially on CPU controlled kickers:</p> <ul> <li>On User controlled kickers, the accuracy meter is tougher to hit (It is smaller and it moves faster, specially on pressure kicks)</li> <li>On CPU controlled kickers, they'll outright miss more</li> </ul>`,
  },
  p: {
    copy: `<p>Your first priority should be KPW, followed by AWR and THEN KAC</p> <p>Low Awareness has a serious effect on kicking ability, specially on CPU controlled kickers:</p> <ul> <li>On User controlled kickers, the accuracy meter is tougher to hit (It is smaller and it moves faster, specially on pressure kicks)</li> <li>On CPU controlled kickers, they'll outright miss more</li> </ul>`,
  },
};
const drPosSuprAdvice = {
  qb: {
    copy: `<p><strong>Involved Ratings:</strong> Speed, Awareness, Throw Power, Throw Accuracy.</p> <ul> <li> <strong>Speed:</strong> Anything from 99 to 80 talk about the QB being a great threat on the run and on open field. Anything 79 to 60 talk about how he has the adequate speed and can buy some time in the pocket. Lower than 60 and it says, not very mobile. </li> <li> <strong>Awareness:</strong> 99 to 97 praise the QB as being extremely smart, kind of like Peyton Manning. 96 to 90 talk about the QB being great at reading defenses. 89 to 87 talk about how he's generally able to find an open man. Lower talk about his decision making, especially under pressure. </li> <li> <strong>Throw Power:</strong> 99 to 92 praise his arm strength. 91 to 83 call it above average to average. Lower and his arm strength is criticized. </li> <li> <strong>Throw Accuracy:</strong> 99 to 92 praise his arm accuracy. 91 to 83 call it above average to good. Lower and it says that he needs to work on his mechanics. </li> </ul> <p><strong>Conclusions:</strong> Speed is what is expected. Same with Throw Power and Throw Accuracy. Awareness is the decision making and the capability to look for another receiver and not force a pass. It also alters the QB Vision Cone.</p>`,
  },
  hb: {
    copy: `<p><strong>Involved Ratings:</strong> Agility, Speed, Acceleration, Awareness, Carrying, Break Tackles (Trucking)</p> <ul> <li> <strong>Agility:</strong> Anything 99 to 92 like his lateral movement speed. Lower up to 83 call it decent enough. Lower and it says that the back lacks elusiveness. </li> <li> <strong>Speed:</strong> Anything higher than 90 is liked. 86 to 85 is called Average NFL Speed, with anything lower said that the back is not fast. </li> <li> <strong>Acceleration:</strong> Just like in a lot of these. From 99 to 92, it says they like his explosiveness through the hole. Lower is still good, up to 87. Then they don't like it. </li> <li> <strong>Awareness:</strong> Apparently this controls Ball Carrier Vision: They like it from 99 to 90. On the 89 to 87 line it says "Needs to slow down and learn how to develop his blocks.". I have never seen a running back show patience in this game. Like, I've seen them cutback inside, but I've never seen them allowing the Linemen to come infront of him and block. Maybe is because my sliders make the run blocking suck (17 Run Block). </li> <li> <strong>Carrying:</strong> It says nothing. Except on the 78 to 0 range, in which it says that fumbles can be a problem. </li> <li> <strong>Break Tackles:</strong> They like it from 99 to 90, saying that he "Keeps pads low to the ground and delivers a blow upon contact.". That's about it. </li> </ul> <p><strong>Conclusions:</strong> Agility is juking ability, spins and elusiveness. Speed is what you expect. Acceleration is explosiveness through the hole. Carrying is exactly that. Break Tackles is Trucking. Awareness should be patience and Ball Carrier Vision.</p>`,
  },
  fb: {
    copy: `<p><strong>Involved Ratings:</strong> Awareness, Catching, Pass Blocking, Run Blocking.</p> <ul> <li> <strong>Awareness:</strong> Anything above 82 is well likes. They like his instincts and is rarely caught out of position. Lower and they call his awareness average. </li> <li> <strong>Catching:</strong> Surprising that Halfbacks don't have this one too. Anyway, anything over 80 is great. Over 70 is good. And over 62 is decent. </li> <li> <strong>Pass Blocking:</strong> They like his blitz pickup skills when over 62. And they still like it when over 51. </li> <li> <strong>Run Blocking:</strong> They like his lead blocking when over 80, and is still great when over 70. Lower and they hate it. </li> </ul> <p><strong>Conclusions:</strong> Awareness is how he recognizes what's going on around, probably who to block. Catching is that. Pass Blocking is how likely he's to pick up a player when his assignment is Pass Block. Same with Run Blocking.</p>`,
  },
  wr: {
    copy: `<p><strong>Involved Ratings:</strong> Agility, Speed, Acceleration, Awareness, Catching, Jumping.</p> <ul> <li> <strong>Agility:</strong> They like anything above 92, saying that he can make defenders miss in the open field. Anything below 82 is disliked. </li> <li> <strong>Speed:</strong> They like anything over 90, saying he's fast enough to get behind most DBs ... I've seen this before (Deep Threat). Less than 82, he's called a possession receiver. </li> <li> <strong>Acceleration:</strong> Again, they like his explosiveness of the snap when over 90. They hate it when less than 82. </li> <li> <strong>Awareness:</strong> Again, over 90 they like it, saying that he has great instincts and runs great routes. At the 81 to 74 range it says "Not a great route runner. Struggles to find his place vs. zone coverage.". </li> <li> <strong>Catching:</strong> They like anything over 90. The 89 to 87 range is called erratic. 82 to 79 is called average. </li> <li> <strong>Jumping:</strong> They like anything over 92. Less than 78 and they start disliking it. Less than 73 it says: "Not a big threat on jump balls on fade routes." </li> </ul> <p><strong>Conclusions:</strong> Agility is Elusiveness and cut speed. Speed is that. Acceleration is that. Awareness is route running. Catching is that. And Jumping is exactly that.</p>`,
  },
  te: {
    copy: `<p><strong>Involved Ratings:</strong> Speed, Awareness, Catching, Run Blocking, Jumping.</p> <ul> <li><strong>Speed:</strong> They like anything over 84. Over 80 is decent.</li> <li><strong>Awareness:</strong> Over 80, they like his recognition skills against zone.</li> <li><strong>Catching:</strong> Over 80, they like it. Less and it's decent.</li> <li><strong>Run Blocking:</strong> They just like it over 70.</li> </ul> <p><strong>Conclusions:</strong> Speed is just that. Awareness is their play recognition and route running. Run Blocking is their capability to engage a block. Catching is that.</p>`,
  },
  t: {
    copy: `<p>I read the descriptions for everyone, and they seem the same for every offensive lineman. As I understand it, the Guards are better run blockers, the Center is the smartest lineman as well as a good pass blocker, the Left Tackle is the best Pass Blocker and the Right Tackles is a great run blocker. I'll take the descriptions from the Left Tackle.</p> <p><strong>Involved Ratings:</strong> Strength, Awareness, Pass Blocking, Run Blocking.</p> <ul> <li> <strong>Strength:</strong> They prefer anything over 92, but still like over 90. The 86 to 83 range says "Has problems with bull rushers over the top.". </li> <li> <strong>Awareness:</strong> Same as Strength, they prefer over 92, but still like over 90. The 99 to 92 range says "Rarely loses a matchup once he's locked onto the defender." </li> <li> <strong>Pass Blocking:</strong> They like anything over 92. They still like over 90, but no as much. They don't like him below that. </li> <li> <strong>Run Blocking:</strong> They like him over 92. In the 91 to 90 range, he's called an asset in the running game. Below 82, they don't like him. </li> </ul> <p><strong>Conclusions:</strong> Strength is the capability to cope with the Bull Rush Power Move. Awareness is the capability to cope with Finesse Moves (Spins and Rips). Pass Blocking, as well as Run Blocking server as multipliers for this.Next up we have: The Defense, followed by The Special Teams.</p>`,
  },
  g: {
    copy: `<p>I read the descriptions for everyone, and they seem the same for every offensive lineman. As I understand it, the Guards are better run blockers, the Center is the smartest lineman as well as a good pass blocker, the Left Tackle is the best Pass Blocker and the Right Tackles is a great run blocker. I'll take the descriptions from the Left Tackle.</p> <p><strong>Involved Ratings:</strong> Strength, Awareness, Pass Blocking, Run Blocking.</p> <ul> <li> <strong>Strength:</strong> They prefer anything over 92, but still like over 90. The 86 to 83 range says "Has problems with bull rushers over the top.". </li> <li> <strong>Awareness:</strong> Same as Strength, they prefer over 92, but still like over 90. The 99 to 92 range says "Rarely loses a matchup once he's locked onto the defender." </li> <li> <strong>Pass Blocking:</strong> They like anything over 92. They still like over 90, but no as much. They don't like him below that. </li> <li> <strong>Run Blocking:</strong> They like him over 92. In the 91 to 90 range, he's called an asset in the running game. Below 82, they don't like him. </li> </ul> <p><strong>Conclusions:</strong> Strength is the capability to cope with the Bull Rush Power Move. Awareness is the capability to cope with Finesse Moves (Spins and Rips). Pass Blocking, as well as Run Blocking server as multipliers for this.Next up we have: The Defense, followed by The Special Teams.</p>`,
  },
  c: {
    copy: `<p>I read the descriptions for everyone, and they seem the same for every offensive lineman. As I understand it, the Guards are better run blockers, the Center is the smartest lineman as well as a good pass blocker, the Left Tackle is the best Pass Blocker and the Right Tackles is a great run blocker. I'll take the descriptions from the Left Tackle.</p> <p><strong>Involved Ratings:</strong> Strength, Awareness, Pass Blocking, Run Blocking.</p> <ul> <li> <strong>Strength:</strong> They prefer anything over 92, but still like over 90. The 86 to 83 range says "Has problems with bull rushers over the top.". </li> <li> <strong>Awareness:</strong> Same as Strength, they prefer over 92, but still like over 90. The 99 to 92 range says "Rarely loses a matchup once he's locked onto the defender." </li> <li> <strong>Pass Blocking:</strong> They like anything over 92. They still like over 90, but no as much. They don't like him below that. </li> <li> <strong>Run Blocking:</strong> They like him over 92. In the 91 to 90 range, he's called an asset in the running game. Below 82, they don't like him. </li> </ul> <p><strong>Conclusions:</strong> Strength is the capability to cope with the Bull Rush Power Move. Awareness is the capability to cope with Finesse Moves (Spins and Rips). Pass Blocking, as well as Run Blocking server as multipliers for this.Next up we have: The Defense, followed by The Special Teams.</p>`,
  },
  de: {
    copy: `<p><strong>Involved Ratings:</strong> Strength, Speed, Acceleration, Awareness.</p> <ul> <li> <strong>Strength:</strong> They like anything over 90, saying that "Could interchange at DE or DT with his strength.". I'd say you want a 3-4 DE with 95 Strength, otherwise get him out of there or use the 4-3. 89 to 85 seems to be the minimum the game likes. Lower than 80 and it says "More of a finesse rusher." </li> <li> <strong>Speed:</strong> They like everything over 80, saying that he has "Scary speed for a defensive end.". The 74 to 69 range is average. </li> <li> <strong>Acceleration:</strong> They love this one over 90. They don't like it below 77. The 99 to 90 range says: "Closing burst is so disruptive that it causes fumbles and hurried throws." </li> <li> <strong>Awareness:</strong> They like it over 92, saying that he is "Intense playmaker that has a real nose for the big play.". The 82 to 76 range says "Overruns too many plays and makes mental mistakes.". </li> </ul> <p><strong>Conclusions:</strong> Strength seems to control the Bull Rush power move and might globally control block shedding. Speed is just that. Acceleration is self explanatory. Awareness SEEMS to control the finesse moves, or the likehood of the DE to use moves, be it power or finesse, to shed a block.</p>`,
  },
  dt: {
    copy: `<p><strong>Involved Ratings:</strong> Strength, Awareness, Tackling.</p> <ul> <li> <strong>Strength:</strong> They like anything over 95, saying that "Has the upper body strength to maintain separation from opposing lineman.". Over 90 is still good. They start to dislike it below 85. </li> <li> <strong>Awareness:</strong> They like it over 90. Not so much below 80. The 89 to 85 range says "Shows the consistency and effort of an upper echelon player.". </li> <li> <strong>Tackling:</strong> They like it over 95, but over 89 is still good. The 88 to 83 range says "Decent tackler.". </li> </ul> <p><strong>Conclusions:</strong> Just like above, Strength appears to control the Bull Rush Power Move and might globally control Block Shedding. Awareness seems to control the likehood of the use of moves to shed blocks. Tackling is exactly that.</p>`,
  },
  olb: {
    copy: `<p>Now, the game descriptions assume that OLBs and MLBs act as the same. Of course, when you run a 4-3, this is somewhat accurate. All linebackers are Off-the-ball Linebackers. When you run a 3-4, not so much. The MLBs are off-the-ball Linebackers, whereas the OLBs are Edge Rushers. I'll use the descriptions of the MLB because they are the same as that of the OLBs.</p> <p><strong>Involved Ratings:</strong> Speed, Acceleration, Awareness, Tackling.</p> <ul> <li> <strong>Speed:</strong> They like him over 85, saying "One of the fastest linebackers; really a sideline to sideline defender.". The 79 to 75 seems to be average. Below 67 it says "Very slow for a linebacker. May end up moving to rush end." </li> <li> <strong>Acceleration:</strong> They like him over 92, as most of these descriptions do. The 79 to 72 seems to be the average. That range says "Below average explosion when closing. Can be exploited on the blitz." </li> <li> <strong>Awareness:</strong> Above 92 it says "Tremendous instincts; shows natural playmaking ability.". The 85 to 80 range seems to be average. </li> <li> <strong>Tackling:</strong> Naturally, over 92 they like him. The 91 to 88 range says "Breaks down in the open field, wrapping up the ballcarrier." Not sure if that is good or bad. </li> </ul> <p><strong>Conclusions:</strong> Speed is just that. Acceleration is explosiveness of the snap. Awareness is play recognition. Tackling is ... well ... tackling. This MIGHT or MIGHT NOT influence the capability of forcing fumbles. Not sure, they don't make any comments about it.</p>`,
  },
  mlb: {
    copy: `<p>Now, the game descriptions assume that OLBs and MLBs act as the same. Of course, when you run a 4-3, this is somewhat accurate. All linebackers are Off-the-ball Linebackers. When you run a 3-4, not so much. The MLBs are off-the-ball Linebackers, whereas the OLBs are Edge Rushers. I'll use the descriptions of the MLB because they are the same as that of the OLBs.</p> <p><strong>Involved Ratings:</strong> Speed, Acceleration, Awareness, Tackling.</p> <ul> <li> <strong>Speed:</strong> They like him over 85, saying "One of the fastest linebackers; really a sideline to sideline defender.". The 79 to 75 seems to be average. Below 67 it says "Very slow for a linebacker. May end up moving to rush end." </li> <li> <strong>Acceleration:</strong> They like him over 92, as most of these descriptions do. The 79 to 72 seems to be the average. That range says "Below average explosion when closing. Can be exploited on the blitz." </li> <li> <strong>Awareness:</strong> Above 92 it says "Tremendous instincts; shows natural playmaking ability.". The 85 to 80 range seems to be average. </li> <li> <strong>Tackling:</strong> Naturally, over 92 they like him. The 91 to 88 range says "Breaks down in the open field, wrapping up the ballcarrier." Not sure if that is good or bad. </li> </ul> <p><strong>Conclusions:</strong> Speed is just that. Acceleration is explosiveness of the snap. Awareness is play recognition. Tackling is ... well ... tackling. This MIGHT or MIGHT NOT influence the capability of forcing fumbles. Not sure, they don't make any comments about it.</p>`,
  },
  cb: {
    copy: `<p><strong>Involved Ratings:</strong> Agility, Speed, Awareness, Jumping.</p> <ul> <li> <strong>Agility:</strong> They like him over 96 all the way up to 90. They start hating at 85. </li> <li> <strong>Speed:</strong> They like him over 97 all the way to 90. Then they don't like him. The 94 to 90 range says "Has good speed for an NFL corner." </li> <li> <strong>Awareness:</strong> Above 94 it says "Is always one of the most intelligent corners in the NFL.". Below 84 they don't like him. I'm realizing these might be the triggers for some of the players weapons. SOME. </li> <li> <strong>Jumping:</strong> They like him above 95 all the way to 90. They hate him below 85. </li> </ul> <p><strong>Conclusions:</strong> Agility is quickness when turning. Speed is just that. Awareness is play recognition and coverage ability. Jumping is ... well ... that.</p>`,
  },
  fs: {
    copy: `<p>Both Safeties are considered equal according to the descriptions.</p> <p><strong>Involved Ratings:</strong> Speed, Acceleration, Awareness, Tackling.</p> <ul> <li> <strong>Speed:</strong> They like him over 92, saying "About as fast as it gets at safety." They still like him at 87. 86 to 82 seems average. </li> <li> <strong>Acceleration:</strong> They like him over 92, again. The 91 to 87 range is called average. </li> <li> <strong>Awareness:</strong> Above 90 is good, saying "One of the most intelligent safeties in the NFL.". Below 83, they don't like him. Below 76, it says "His instincts, namely his angles of pursuit, leave a lot to be desired." </li> <li> <strong>Tackling:</strong> Above 84 it says "Devastating tackler that punishes receivers over the middle.". They still like him above 78, saying "Loves to tackle and dole out punishment.". The average seems to be 77 to 72. Key part here. The 71 to 65 range says "Should not be involved in run support." </li> </ul> <p><strong>Conclusions:</strong> Speed is that. Acceleration is explosiveness off the snap. Awareness is play recognition and pursuit. Tackling is ... that.</p>`,
  },
  ss: {
    copy: `<p>Both Safeties are considered equal according to the descriptions.</p> <p><strong>Involved Ratings:</strong> Speed, Acceleration, Awareness, Tackling.</p> <ul> <li> <strong>Speed:</strong> They like him over 92, saying "About as fast as it gets at safety." They still like him at 87. 86 to 82 seems average. </li> <li> <strong>Acceleration:</strong> They like him over 92, again. The 91 to 87 range is called average. </li> <li> <strong>Awareness:</strong> Above 90 is good, saying "One of the most intelligent safeties in the NFL.". Below 83, they don't like him. Below 76, it says "His instincts, namely his angles of pursuit, leave a lot to be desired." </li> <li> <strong>Tackling:</strong> Above 84 it says "Devastating tackler that punishes receivers over the middle.". They still like him above 78, saying "Loves to tackle and dole out punishment.". The average seems to be 77 to 72. Key part here. The 71 to 65 range says "Should not be involved in run support." </li> </ul> <p><strong>Conclusions:</strong> Speed is that. Acceleration is explosiveness off the snap. Awareness is play recognition and pursuit. Tackling is ... that.</p>`,
  },
  k: {
    copy: `<p><strong>Involved Ratings:</strong> Kick Power, Kick Accuracy, Awareness.</p> <ul> <li> Kick Power: They like him over 95, all the way to 85. The 89 to 85 range says "Decent leg strength. Can make it from the high forties to low 50's.". The next range, 84 to 80 says "Doesn't have a great leg. Struggles on kickoffs and long attempts.". </li> <li> Kick Accuracy: They like him over 94, almost calling him Adam Vinatieri. Well, not so much. But it says "About as close to automatic as it gets in terms of accuracy.". They still like him up to 89. Below, not so much. </li> <li> Awareness: This rating. All right. Over 92 it says "Able to make the kicks that he's expected to and come up big in the pressure moments.". The 91 to 82 range says "Solid kicker that can be counted on when needed.". The 81 to 77 range says "Is inconsistent at times but is usually dependable.". Below that it says "Poor confidence leads to too many misses.". </li> </ul> <p><strong>Conclusions:</strong> Kick Power and Kick Accuracy are exactly what you expect. However, Awareness is interesting. Awareness seems to be either Clutch Factor and/or Confidence. And apparently below 77 is bad. Very bad.</p>`,
  },
  p: {
    copy: `<p><strong>Involved Ratings:</strong> Kick Power, Kick Accuracy.</p> <ul> <li> Kick Power: They like him over 95, all the way to 85. The 89 to 85 range says "Pretty strong leg strength. Not great, but sufficient.". The next range, 84 to 80 says "Average leg strength. ". </li> <li> Kick Accuracy: They like him over 92, saying "He has upper echelon accuracy on placements.". They still like him up to 82. Below, not so much. </li> </ul> <p><strong>Conclusions:</strong> Kick Power and Kick Accuracy are exactly what you expect. Is interesting that Awareness does not seem to be a factor here, which is interesting.</p>`,
  },
};
const drPosImportantAttr = {
  qb: {
    attr: ["thp", "spd", "tha", "car"],
    prog: ["awr", "tha", "sta"],
  },
  hb: {
    attr: ["spd", "agi", "btk", "acc", "cth", "car"],
    prog: ["awr", "cth", "car", "btk", "sta"],
  },
  fb: {
    attr: ["spd", "cth", "str", "rbk", "pbk"],
    prog: ["awr", "cth", "pbk", "rbk", "sta"],
  },
  wr: {
    attr: ["spd", "cth", "agi", "acc", "jmp", "car", "btk"],
    prog: ["awr", "cth", "sta"],
  },
  te: {
    attr: ["spd", "cth", "agi", "acc", "jmp", "str", "rbk", "pbk"],
    prog: ["awr", "cth", "sta"],
  },
  t: {
    attr: ["str", "agi", "pbk", "rbk", "acc", "spd"],
    prog: ["awr", "pbk", "rbk", "sta"],
  },
  g: {
    attr: ["str", "agi", "pbk", "rbk", "acc", "spd"],
    prog: ["awr", "pbk", "rbk", "sta"],
  },
  c: {
    attr: ["str", "agi", "pbk", "rbk", "acc", "spd"],
    prog: ["awr", "pbk", "rbk", "sta"],
  },
  de: {
    attr: ["str", "acc", "tak", "agi"],
    prog: ["awr", "tak", "sta"],
  },
  dt: {
    attr: ["str", "acc", "tak", "agi"],
    prog: ["awr", "tak", "sta"],
  },
  olb: {
    attr: ["spd", "acc", "tak", "str", "agi"],
    prog: ["awr", "tak", "sta"],
  },
  mlb: {
    attr: ["spd", "acc", "tak", "str", "agi"],
    prog: ["awr", "tak", "sta"],
  },
  cb: {
    attr: ["spd", "acc", "agi", "cth", "tak"],
    prog: ["awr", "cth", "tak", "sta"],
  },
  fs: {
    attr: ["spd", "acc", "agi", "cth", "tak"],
    prog: ["awr", "cth", "tak", "sta"],
  },
  ss: {
    attr: ["spd", "acc", "agi", "cth", "tak"],
    prog: ["awr", "cth", "tak", "sta"],
  },
  k: {
    attr: ["kpw", "kac"],
    prog: ["awr", "kac", "sta"],
  },
  p: {
    attr: ["kpw", "kac"],
    prog: ["awr", "kac", "sta"],
  },
};
const drAttributes = {
  spd: { name: "speed", tip: "" },
  str: { name: "strength", tip: "" },
  awr: { name: "awareness", tip: "" },
  agi: { name: "agility", tip: "" },
  acc: { name: "acceleration", tip: "" },
  cth: { name: "catch", tip: "" },
  car: { name: "carry", tip: "" },
  jmp: { name: "jump", tip: "" },
  btk: { name: "break tackle", tip: "" },
  tak: { name: "tackle", tip: "" },
  thp: { name: "throw power", tip: "" },
  tha: { name: "throw accuracy", tip: "" },
  pbk: { name: "pass block", tip: "" },
  rbk: { name: "run block", tip: "" },
  kpw: { name: "kick power", tip: "" },
  kac: { name: "kick accuracy", tip: "" },
  krt: { name: "kick return", tip: "" },
  sta: { name: "stamina", tip: "" },
  inj: { name: "injury", tip: "" },
  tgh: { name: "toughness", tip: "injury recovery rate" },
};
const drAttrAverages = {
  qb: {
    starters: {
      name: "Starter Avg",
      data: [
        80,
        65,
        82,
        80,
        84,
        41,
        63,
        74,
        63,
        30,
        89,
        85,
        17,
        22,
        24,
        21,
        11,
        87,
        90,
        94,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        77,
        61,
        63,
        75,
        82,
        37,
        61,
        74,
        49,
        27,
        84,
        73,
        18,
        20,
        25,
        22,
        14,
        76,
        87,
        85,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        78,
        62,
        68,
        77,
        83,
        38,
        61,
        74,
        53,
        28,
        85,
        77,
        18,
        20,
        25,
        22,
        13,
        79,
        87,
        87,
      ],
    },
    archetype1: {
      name: "Field General QB",
      data: [
        70,
        66,
        64,
        72,
        72,
        40,
        61,
        40,
        54,
        29,
        88,
        83,
        30,
        30,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Scrambler QB",
      data: [
        86,
        66,
        55,
        87,
        84,
        40,
        69,
        40,
        69,
        29,
        87,
        77,
        30,
        30,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Strong Arm QB",
      data: [
        68,
        67,
        53,
        68,
        64,
        40,
        61,
        40,
        54,
        29,
        94,
        78,
        30,
        30,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype4: {
      name: "West Coast QB",
      data: [
        74,
        62,
        60,
        70,
        72,
        40,
        61,
        40,
        62,
        29,
        87,
        84,
        30,
        30,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
  },
  hb: {
    starters: {
      name: "Starter Avg",
      data: [
        90,
        76,
        86,
        89,
        91,
        70,
        91,
        86,
        85,
        34,
        35,
        27,
        58,
        41,
        21,
        18,
        63,
        91,
        87,
        88,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        89,
        70,
        68,
        86,
        90,
        67,
        85,
        83,
        75,
        32,
        30,
        22,
        51,
        38,
        19,
        17,
        64,
        83,
        86,
        81,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        89,
        71,
        72,
        86,
        90,
        67,
        86,
        84,
        77,
        33,
        31,
        23,
        53,
        39,
        19,
        17,
        64,
        85,
        86,
        83,
      ],
    },
    archetype1: {
      name: "Elusive Back HB",
      data: [
        93,
        66,
        59,
        87,
        89,
        68,
        84,
        60,
        76,
        29,
        40,
        30,
        49,
        36,
        40,
        30,
        82,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Power Back HB",
      data: [
        90,
        82,
        55,
        83,
        84,
        65,
        87,
        40,
        82,
        29,
        40,
        30,
        65,
        49,
        40,
        30,
        55,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Receiving Back HB",
      data: [
        93,
        68,
        58,
        87,
        88,
        73,
        82,
        60,
        70,
        29,
        40,
        30,
        53,
        36,
        40,
        30,
        87,
        80,
        82,
        80,
      ],
    },
  },
  fb: {
    starters: {
      name: "Starter Avg",
      data: [
        81,
        75,
        70,
        79,
        86,
        70,
        74,
        81,
        55,
        49,
        30,
        15,
        62,
        59,
        21,
        19,
        31,
        82,
        88,
        83,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        81,
        74,
        60,
        78,
        85,
        70,
        76,
        80,
        60,
        37,
        34,
        20,
        60,
        56,
        20,
        17,
        29,
        81,
        84,
        83,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        81,
        75,
        67,
        79,
        86,
        70,
        75,
        81,
        56,
        45,
        32,
        16,
        61,
        58,
        21,
        18,
        30,
        82,
        87,
        83,
      ],
    },
    archetype1: {
      name: "Blocking FB",
      data: [
        72,
        84,
        54,
        74,
        80,
        62,
        76,
        78,
        54,
        49,
        40,
        30,
        64,
        67,
        40,
        30,
        36,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Utility FB",
      data: [
        81,
        77,
        54,
        80,
        83,
        67,
        77,
        82,
        54,
        49,
        40,
        30,
        60,
        60,
        40,
        30,
        55,
        80,
        82,
        80,
      ],
    },
  },
  wr: {
    starters: {
      name: "Starter Avg",
      data: [
        91,
        65,
        87,
        90,
        91,
        89,
        75,
        89,
        79,
        32,
        39,
        23,
        38,
        52,
        23,
        21,
        69,
        87,
        87,
        85,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        89,
        61,
        67,
        87,
        90,
        81,
        72,
        86,
        72,
        31,
        34,
        21,
        35,
        48,
        21,
        17,
        67,
        82,
        87,
        80,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        90,
        62,
        71,
        87,
        90,
        82,
        72,
        86,
        74,
        32,
        35,
        21,
        36,
        49,
        21,
        18,
        67,
        83,
        87,
        81,
      ],
    },
    archetype1: {
      name: "Deep Threat WR",
      data: [
        93,
        54,
        47,
        91,
        89,
        77,
        67,
        74,
        55,
        29,
        40,
        30,
        50,
        54,
        40,
        30,
        87,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Possession WR",
      data: [
        89,
        70,
        55,
        85,
        86,
        83,
        76,
        82,
        67,
        29,
        40,
        30,
        50,
        54,
        40,
        30,
        76,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Physical WR",
      data: [
        89,
        72,
        58,
        87,
        86,
        80,
        69,
        85,
        76,
        29,
        40,
        30,
        50,
        54,
        40,
        30,
        76,
        80,
        82,
        80,
      ],
    },
    archetype4: {
      name: "Slot WR",
      data: [
        90,
        62,
        52,
        88,
        89,
        80,
        70,
        70,
        67,
        29,
        40,
        30,
        50,
        67,
        40,
        30,
        79,
        80,
        82,
        80,
      ],
    },
  },
  te: {
    starters: {
      name: "Starter Avg",
      data: [
        83,
        74,
        83,
        82,
        87,
        87,
        75,
        85,
        68,
        38,
        37,
        18,
        60,
        64,
        22,
        18,
        22,
        86,
        87,
        84,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        80,
        72,
        65,
        78,
        85,
        77,
        72,
        79,
        59,
        37,
        31,
        18,
        59,
        60,
        20,
        18,
        23,
        82,
        86,
        81,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        81,
        73,
        69,
        79,
        85,
        79,
        73,
        81,
        61,
        37,
        33,
        18,
        59,
        61,
        20,
        18,
        23,
        83,
        86,
        82,
      ],
    },
    archetype1: {
      name: "Blocking TE",
      data: [
        68,
        78,
        57,
        72,
        69,
        71,
        69,
        65,
        62,
        29,
        40,
        30,
        63,
        70,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Possession TE",
      data: [
        78,
        75,
        55,
        76,
        74,
        77,
        70,
        70,
        62,
        29,
        40,
        30,
        58,
        60,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Vertical Threat TE",
      data: [
        82,
        62,
        52,
        81,
        83,
        76,
        62,
        78,
        55,
        29,
        40,
        30,
        55,
        57,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
  },
  t: {
    starters: {
      name: "Starter Avg",
      data: [
        67,
        88,
        87,
        66,
        78,
        35,
        38,
        73,
        13,
        37,
        23,
        7,
        80,
        79,
        19,
        18,
        10,
        86,
        89,
        86,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        63,
        84,
        67,
        61,
        76,
        30,
        33,
        69,
        10,
        35,
        22,
        7,
        67,
        67,
        19,
        18,
        10,
        83,
        87,
        84,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        65,
        85,
        74,
        63,
        77,
        32,
        35,
        70,
        11,
        36,
        23,
        7,
        71,
        71,
        19,
        18,
        10,
        84,
        88,
        85,
      ],
    },
    archetype1: {
      name: "Agile T",
      data: [
        75,
        84,
        54,
        73,
        76,
        40,
        30,
        30,
        30,
        29,
        40,
        30,
        81,
        84,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Pass Prot. T",
      data: [
        64,
        87,
        59,
        68,
        74,
        40,
        30,
        30,
        30,
        29,
        40,
        30,
        85,
        74,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Power T",
      data: [
        68,
        89,
        54,
        68,
        69,
        40,
        30,
        30,
        30,
        29,
        40,
        30,
        74,
        80,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
  },
  g: {
    starters: {
      name: "Starter Avg",
      data: [
        66,
        88,
        85,
        63,
        78,
        31,
        36,
        72,
        10,
        37,
        23,
        7,
        76,
        78,
        20,
        19,
        10,
        85,
        89,
        87,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        63,
        85,
        67,
        60,
        77,
        30,
        33,
        68,
        11,
        33,
        23,
        7,
        67,
        67,
        20,
        19,
        9,
        81,
        87,
        85,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        64,
        86,
        73,
        61,
        77,
        30,
        34,
        69,
        11,
        34,
        23,
        7,
        70,
        71,
        20,
        19,
        10,
        82,
        88,
        86,
      ],
    },
    archetype1: {
      name: "Agile G",
      data: [
        72,
        84,
        55,
        73,
        74,
        30,
        30,
        30,
        15,
        29,
        40,
        30,
        80,
        81,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Pass Prot. G",
      data: [
        68,
        87,
        59,
        73,
        74,
        30,
        30,
        30,
        15,
        29,
        40,
        30,
        84,
        74,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Power G",
      data: [
        68,
        92,
        54,
        72,
        72,
        30,
        30,
        30,
        15,
        29,
        40,
        30,
        71,
        80,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
  },
  c: {
    starters: {
      name: "Starter Avg",
      data: [
        65,
        87,
        87,
        64,
        78,
        33,
        34,
        71,
        10,
        35,
        22,
        7,
        79,
        80,
        19,
        19,
        10,
        85,
        89,
        87,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        66,
        79,
        66,
        64,
        77,
        40,
        43,
        68,
        14,
        42,
        27,
        8,
        62,
        61,
        20,
        19,
        11,
        80,
        87,
        84,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        66,
        81,
        71,
        64,
        78,
        38,
        41,
        69,
        13,
        40,
        25,
        8,
        66,
        65,
        20,
        19,
        11,
        81,
        88,
        85,
      ],
    },
    archetype1: {
      name: "Agile C",
      data: [
        68,
        80,
        60,
        74,
        72,
        30,
        30,
        30,
        15,
        29,
        40,
        30,
        80,
        81,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Pass Prot. C",
      data: [
        64,
        81,
        60,
        73,
        72,
        30,
        30,
        30,
        15,
        29,
        40,
        30,
        81,
        74,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Power C",
      data: [
        62,
        86,
        58,
        68,
        67,
        30,
        30,
        30,
        15,
        29,
        40,
        30,
        74,
        80,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
  },
  de: {
    starters: {
      name: "Starter Avg",
      data: [
        78,
        85,
        85,
        78,
        85,
        41,
        43,
        80,
        19,
        83,
        23,
        7,
        45,
        45,
        19,
        18,
        12,
        78,
        89,
        84,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        76,
        81,
        66,
        73,
        84,
        40,
        40,
        77,
        20,
        78,
        23,
        7,
        45,
        45,
        19,
        17,
        10,
        75,
        87,
        84,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        77,
        82,
        71,
        74,
        84,
        40,
        41,
        78,
        20,
        79,
        23,
        7,
        45,
        45,
        19,
        17,
        11,
        76,
        88,
        84,
      ],
    },
    archetype1: {
      name: "Power Rusher DE",
      data: [
        76,
        90,
        56,
        77,
        80,
        30,
        40,
        50,
        15,
        77,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Run Stopper DE",
      data: [
        75,
        84,
        55,
        76,
        78,
        30,
        40,
        50,
        15,
        81,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Speed Rusher DE",
      data: [
        83,
        75,
        55,
        82,
        84,
        30,
        40,
        50,
        15,
        77,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
  },
  dt: {
    starters: {
      name: "Starter Avg",
      data: [
        69,
        90,
        84,
        69,
        81,
        32,
        38,
        75,
        14,
        85,
        21,
        7,
        45,
        46,
        18,
        16,
        10,
        77,
        89,
        83,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        68,
        86,
        67,
        65,
        79,
        32,
        35,
        71,
        15,
        79,
        23,
        8,
        44,
        45,
        19,
        17,
        10,
        73,
        87,
        84,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        68,
        87,
        71,
        66,
        80,
        32,
        36,
        72,
        15,
        80,
        22,
        7,
        44,
        45,
        18,
        17,
        10,
        74,
        88,
        84,
      ],
    },
    archetype1: {
      name: "Power Rusher DT",
      data: [
        68,
        92,
        57,
        73,
        78,
        30,
        40,
        50,
        15,
        74,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Run Stopper DT",
      data: [
        68,
        85,
        58,
        70,
        76,
        30,
        40,
        50,
        15,
        80,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Speed Rusher DT",
      data: [
        77,
        81,
        56,
        76,
        81,
        30,
        40,
        50,
        15,
        76,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
  },
  olb: {
    starters: {
      name: "Starter Avg",
      data: [
        84,
        77,
        80,
        82,
        87,
        59,
        53,
        84,
        25,
        82,
        25,
        8,
        44,
        44,
        21,
        19,
        13,
        85,
        87,
        84,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        82,
        74,
        64,
        79,
        86,
        53,
        50,
        81,
        26,
        78,
        26,
        9,
        43,
        43,
        20,
        18,
        14,
        82,
        86,
        83,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        83,
        75,
        70,
        80,
        86,
        55,
        51,
        82,
        26,
        80,
        26,
        9,
        44,
        44,
        20,
        18,
        14,
        83,
        87,
        83,
      ],
    },
    archetype1: {
      name: "Pass Coverage OLB",
      data: [
        87,
        73,
        58,
        85,
        84,
        40,
        40,
        60,
        15,
        77,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Power Rusher OLB",
      data: [
        77,
        84,
        57,
        76,
        83,
        40,
        40,
        60,
        15,
        77,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Run Stopper OLB",
      data: [
        77,
        80,
        57,
        83,
        84,
        40,
        40,
        60,
        15,
        81,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype4: {
      name: "Speed Rusher OLB",
      data: [
        85,
        75,
        57,
        82,
        86,
        40,
        40,
        60,
        15,
        76,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
  },
  mlb: {
    starters: {
      name: "Starter Avg",
      data: [
        84,
        76,
        80,
        82,
        87,
        58,
        51,
        84,
        24,
        81,
        25,
        8,
        45,
        44,
        21,
        19,
        16,
        84,
        88,
        85,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        83,
        74,
        65,
        80,
        87,
        56,
        51,
        82,
        27,
        78,
        28,
        11,
        43,
        43,
        21,
        18,
        16,
        83,
        87,
        82,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        83,
        74,
        70,
        80,
        87,
        57,
        51,
        83,
        26,
        79,
        27,
        10,
        44,
        44,
        21,
        19,
        16,
        83,
        88,
        83,
      ],
    },
    archetype1: {
      name: "Field General MLB",
      data: [
        80,
        80,
        57,
        80,
        80,
        40,
        40,
        60,
        15,
        77,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Pass Coverage MLB",
      data: [
        84,
        72,
        57,
        83,
        83,
        40,
        40,
        60,
        15,
        77,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Run Stopper MLB",
      data: [
        78,
        80,
        54,
        78,
        81,
        40,
        40,
        60,
        15,
        82,
        40,
        30,
        45,
        45,
        40,
        30,
        15,
        80,
        82,
        80,
      ],
    },
  },
  cb: {
    starters: {
      name: "Starter Avg",
      data: [
        91,
        64,
        84,
        89,
        91,
        72,
        62,
        88,
        59,
        60,
        27,
        8,
        31,
        32,
        19,
        18,
        61,
        92,
        88,
        80,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        89,
        60,
        65,
        87,
        90,
        65,
        60,
        86,
        52,
        57,
        27,
        10,
        29,
        31,
        18,
        17,
        56,
        89,
        86,
        79,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        90,
        61,
        69,
        87,
        90,
        67,
        61,
        87,
        54,
        58,
        27,
        9,
        30,
        31,
        19,
        17,
        57,
        90,
        87,
        80,
      ],
    },
    archetype1: {
      name: "Man to Man CB",
      data: [
        94,
        58,
        57,
        87,
        89,
        65,
        67,
        82,
        40,
        63,
        40,
        30,
        45,
        45,
        40,
        30,
        70,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Slot CB",
      data: [
        92,
        67,
        57,
        85,
        88,
        62,
        69,
        74,
        40,
        67,
        40,
        30,
        45,
        45,
        40,
        30,
        63,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Zone CB",
      data: [
        92,
        68,
        55,
        85,
        86,
        54,
        58,
        85,
        40,
        73,
        40,
        30,
        45,
        45,
        40,
        30,
        68,
        80,
        82,
        80,
      ],
    },
  },
  fs: {
    starters: {
      name: "Starter Avg",
      data: [
        88,
        64,
        83,
        87,
        90,
        73,
        65,
        87,
        49,
        70,
        27,
        10,
        33,
        33,
        22,
        20,
        57,
        90,
        88,
        82,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        88,
        63,
        66,
        85,
        89,
        66,
        61,
        86,
        49,
        67,
        27,
        9,
        31,
        32,
        20,
        18,
        48,
        89,
        87,
        82,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        88,
        63,
        72,
        86,
        90,
        68,
        63,
        87,
        49,
        68,
        27,
        10,
        32,
        32,
        21,
        19,
        51,
        89,
        87,
        82,
      ],
    },
    archetype1: {
      name: "Hybrid FS",
      data: [
        89,
        73,
        54,
        86,
        87,
        65,
        69,
        78,
        40,
        73,
        40,
        30,
        45,
        45,
        40,
        30,
        30,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Run Support FS",
      data: [
        85,
        75,
        55,
        82,
        86,
        58,
        58,
        76,
        40,
        82,
        40,
        30,
        45,
        45,
        40,
        30,
        30,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Zone FS",
      data: [
        89,
        73,
        53,
        84,
        84,
        68,
        67,
        73,
        40,
        73,
        40,
        30,
        45,
        45,
        40,
        30,
        60,
        80,
        82,
        80,
      ],
    },
  },
  ss: {
    starters: {
      name: "Starter Avg",
      data: [
        88,
        70,
        81,
        86,
        90,
        72,
        65,
        86,
        44,
        73,
        27,
        9,
        32,
        32,
        22,
        19,
        54,
        91,
        90,
        83,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        87,
        66,
        64,
        85,
        89,
        66,
        62,
        85,
        47,
        68,
        27,
        10,
        32,
        32,
        21,
        17,
        49,
        88,
        87,
        83,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        88,
        67,
        69,
        85,
        89,
        68,
        63,
        85,
        46,
        69,
        27,
        10,
        32,
        32,
        21,
        18,
        51,
        89,
        88,
        83,
      ],
    },
    archetype1: {
      name: "Hybrid SS",
      data: [
        89,
        73,
        54,
        86,
        87,
        65,
        69,
        78,
        40,
        73,
        40,
        30,
        45,
        45,
        40,
        30,
        30,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Run Support SS",
      data: [
        85,
        75,
        55,
        82,
        86,
        58,
        58,
        76,
        40,
        82,
        40,
        30,
        45,
        45,
        40,
        30,
        30,
        80,
        82,
        80,
      ],
    },
    archetype3: {
      name: "Zone SS",
      data: [
        89,
        73,
        53,
        84,
        84,
        68,
        67,
        73,
        40,
        73,
        40,
        30,
        45,
        45,
        40,
        30,
        60,
        80,
        82,
        80,
      ],
    },
  },
  k: {
    starters: {
      name: "Starter Avg",
      data: [
        71,
        46,
        81,
        62,
        77,
        33,
        40,
        54,
        12,
        25,
        34,
        27,
        16,
        17,
        95,
        82,
        10,
        83,
        88,
        62,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        68,
        45,
        74,
        61,
        74,
        29,
        35,
        56,
        15,
        29,
        32,
        27,
        18,
        20,
        91,
        71,
        11,
        83,
        85,
        64,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        70,
        45,
        78,
        62,
        76,
        31,
        38,
        54,
        13,
        27,
        33,
        27,
        17,
        18,
        93,
        77,
        10,
        83,
        86,
        63,
      ],
    },
    archetype1: {
      name: "Power K",
      data: [
        70,
        54,
        56,
        60,
        70,
        40,
        30,
        30,
        10,
        29,
        40,
        30,
        45,
        45,
        90,
        85,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Accurate K",
      data: [
        68,
        54,
        56,
        60,
        70,
        40,
        30,
        30,
        10,
        29,
        40,
        30,
        45,
        45,
        86,
        90,
        15,
        80,
        82,
        80,
      ],
    },
  },
  p: {
    starters: {
      name: "Starter Avg",
      data: [
        74,
        50,
        81,
        65,
        80,
        34,
        41,
        61,
        14,
        31,
        43,
        29,
        17,
        19,
        93,
        81,
        10,
        85,
        89,
        66,
      ],
    },
    backups: {
      name: "Non-Starter Avg",
      data: [
        71,
        54,
        72,
        63,
        79,
        32,
        39,
        57,
        14,
        30,
        40,
        31,
        16,
        16,
        91,
        70,
        14,
        84,
        86,
        65,
      ],
    },
    draft: {
      name: "Draft Class Avg",
      data: [
        73,
        51,
        78,
        65,
        80,
        33,
        40,
        59,
        14,
        31,
        42,
        29,
        17,
        18,
        93,
        77,
        11,
        84,
        88,
        66,
      ],
    },
    archetype1: {
      name: "Power P",
      data: [
        70,
        54,
        56,
        60,
        76,
        40,
        30,
        30,
        10,
        29,
        40,
        30,
        45,
        45,
        90,
        85,
        15,
        80,
        82,
        80,
      ],
    },
    archetype2: {
      name: "Accurate P",
      data: [
        55,
        33,
        56,
        60,
        76,
        40,
        30,
        30,
        10,
        29,
        40,
        30,
        45,
        45,
        86,
        90,
        15,
        80,
        82,
        80,
      ],
    },
  },
};
const infoCopy = {
  header: {
    title: "About the Draft/Free Agent Helper",
    body: `
<p>
  Use this page to keep track of your position needs as you progress through free agency and the draft.
  <strong>This page uses cookies to save your progress in case you close the window or navigate away.</strong>
</p>

<h4 class="mb-0">Team Needs</h4>
<ul>
  <li>Click the Add button and select a position and quantity from the popup form</li>
  <li>Add as many positions and quantities as necessary</li>
  <li>To clear all positions and start over, click the Reset button</li>
</ul>

<h4 class="mb-0">Navigation</h4>
<p>Click on a position under Team Needs or from the tabs on the left to view a needs breakdown for that position along with helpful reference information.</p>

<h4 class="mb-0">Players</h4>
<ul>
  <li>As you acquire needed players, click the update button and select a status for how they were acquired
  <br>(i.e. If the player was drafted, click Drafted, if acquired via trade, click Trade, etc.)</li>
  <li>To remove a player's status and mark them as still needed, click Reset</li>
  <li>Click Delete to remove a player from your board</li>
  <li>When you update a player's status, the Team Needs section will update to indicate how many players are still needed and how many have been acquired</li>
</ul>`,
  },
  averages: {
    title: "Attribute Averages",
    body: `
<p>This table displays average attribute values for specific player archetypes. The most relevant position attributes are highlighted in blue.</p>

<h4 class="mb-0">Draft Class Avg</h4>
<p>Numbers per position averaged from 20 game-generated draft classes. (T, G, DE, and OLB are combined averages of both left and right positions.)</p>

<h4 class="mb-0">Roster Avg</h4>
<p>
  Numbers per position averaged from all players on the <strong>2020ROJO Roster v22</strong> roster file.
  (T, G, DE, and OLB are combined averages of both left and right positions.)
</p>

<h4 class="mb-0">All Other Archetypes</h4>
<p>These are ideal attribute values for a given player archetype, taken from <strong>jose21crisis</strong>'s Draft Class Generator.</p>

<h4 class="mb-0">Highlighting Rows</h4>
<p>Hover over rows to highlight them in red. Click on a row to keep it highlighted. Click it again to remove highlighting.</p>`,
  },
  advice: {
    title: "Position Advice",
    body: `
<p>Great advice originally posted
  <a href="https://footballidiot.com/forum/viewtopic.php?f=11&t=21567&p=127170&hilit=player+attributes#p126813" target="_blank">here</a>
  by <strong>jose21crisis</strong> about what attributes to look for at each position.</p>`,
  },
  scouting: {
    title: "Superstar Scouting Report Ratings",
    body: `
<p>
  A summary of Madden 08's superstar scouting report data by <strong>jose21crisis</strong>. It is interesting to see which attribute values the game considers good and not so good at each position, as well as J21C's conclusions.
  <br>Original thread <a href="https://footballidiot.com/forum/viewtopic.php?f=18&t=20690" target="_blank">here</a>.
</p>`,
  },
};

function setDefaults() {
  //check if globals are initialized and set if necessary
  //activeTab
  if (activeTab === null) {
    console.log("initializing activeTab...");
    let cookieActiveTab = parseInt(getCookie("activeTab"));
    if (isNaN(cookieActiveTab)) {
      activeTab = 0;
      console.log("activeTab set to default: " + activeTab);
    } else {
      activeTab = cookieActiveTab;
      console.log("activeTab updated from cookie: " + cookieActiveTab);
    }
  }

  //playerToUpdate
  if (playerToUpdate === null) {
    console.log("initializing playerToUpdate...");
    playerToUpdate = "";
    console.log(`playerToUpdate set to default: "${playerToUpdate}"`);
  }

  //positionNeedsObj
  if (positionNeedsObj === null) {
    console.log("initializing positionNeedsObj...");
    positionNeedsObj = {};
    // deleteCookie("positionNeeds");
    let cookiePositionNeeds = getCookie("positionNeeds");
    if (typeof cookiePositionNeeds === "undefined") {
      Object.keys(drPositions).forEach((pos) => {
        positionNeedsObj[pos] = [];
      });
      console.log("no cookie data. default positionNeedsObj initialized.");
    } else {
      updateNeedsFromStr(cookiePositionNeeds);
      console.log("positionNeeds updated from cookie: " + cookiePositionNeeds);
    }
  }

  // selectedRowsObj
  if (selectedRowsObj === null) {
    console.log("initializing selectedRowsObj...");
    selectedRowsObj = {};
    let cookieSelectedRows = getCookie("selectedRows");
    if (typeof cookieSelectedRows === "undefined") {
      Object.keys(drPositions).forEach((pos) => {
        selectedRowsObj[pos] = null;
      });
      console.log("no cookie data. default selectedRowsObj initialized.");
    } else {
      updateRowsFromStr(cookieSelectedRows);
      console.log("selectedRowsObj updated from cookie: " + cookieSelectedRows);
    }
  }

  return true;
}
function generateSelectPositions() {
  //generates options for positions dropdown
  var selected, content;
  Object.keys(drPositions).forEach((pos) => {
    selected = "";
    if (pos == "qb") {
      selected = " selected";
    }
    content =
      "<option" +
      selected +
      ' value="' +
      pos +
      '">' +
      pos.toUpperCase() +
      "</option>";
    $("#addPositionNeed").append(content);
  });

  return true;
}
function generateTabsDr() {
  //generates navigation tabs
  var i = 0;
  Object.keys(drPositions).forEach((key) => {
    var tabContent = `
      <button class="nav-link text-uppercase" id="tabbable-${i}-tab" data-bs-toggle="tab" data-bs-target="#tabbable-${i}" type="button" role="tab" aria-controls="tabbable-${i}" aria-selected="true">
        ${key}
      </button>`;
    $("#tabbable-tab").append(tabContent);
    generatePaneContentDr(i, key);
    i++;
  });

  return true;
}
function generatePaneContentDr(id, pos) {
  //generate tab pane content
  var content = `
    <div class="tab-pane fade" id="tabbable-${id}" role="tabpanel" aria-labelledby="tabbable-${id}-tab">
      <div class="d-flex">
        <div class="flex-grow-1">
          <h2 class="h1 mb-4">${drPositions[pos].name}</h2>
        </div>
        <div>
          <div class="card bg-transparent border-0">
            <div class="card-body text-end">${pos.toUpperCase()} NEEDS:</div>
          </div>
        </div>
        <div>
          <div class="needs row"></div>
        </div>
        <div>
          <div class="card bg-transparent border-0">
            <div class="card-body">
              <button type="button" id="addButton-${pos}" class="addButton btn btn-outline-secondary btn-sm">
                <i class="fas fa-plus-circle"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>

      <h4>
        Attribute Averages
        <button type="button" class="info btn btn-outline-secondary btn-sm btn-smaller ms-2" value="averages">
          <i class="fas fa-info-circle"></i> Info
        </button>
      </h4>
      <div class="table-responsive">
        <table class="attributes table table-bordered table-dark">
          <thead>`;
  content += generateAttrTableRows(pos, true);
  content += `
          </thead>
          <tbody>`;
  content += generateAttrTableRows(pos);
  content += `
          </tbody>
        </table>
      </div>

      <h4>
        Advice <small class="text-muted text-lowercase">from jose21crisis</small>
        <button type="button" class="info btn btn-outline-secondary btn-sm btn-smaller ms-2" value="advice">
          <i class="fas fa-info-circle"></i> Info
        </button>
      </h4>`;
  content += drPosJ21Advice[pos].copy;
  content += `
      <hr class="my-4">
      <h4>
        Superstar Scouting Report Ratings
        <button type="button" class="info btn btn-outline-secondary btn-sm btn-smaller ms-2" value="scouting">
          <i class="fas fa-info-circle"></i> Info
        </button>
      </h4>`;
  content += drPosSuprAdvice[pos].copy;
  content += `
    </div>`;
  $("#tabbable-tabContent").append(content);

  return true;
}
function generateAttrTableRows(pos, head = false) {
  var content = "";
  var cellClass = 0;
  var posKeys = Object.keys(drAttributes);

  if (head != false) {
    content += `
            <tr>
              <th scope="col" class="text-start">Archetype</th>`;
    posKeys.forEach((key) => {
      cellClass = 0;
      if (drPosImportantAttr[pos].attr.indexOf(key) !== -1 || key == "awr") {
        cellClass = ` imp`;
      }
      if (drPosImportantAttr[pos].prog.indexOf(key) !== -1 || key == "awr") {
        cellClass = ` prog`;
      }

      content += `
              <th class="text-uppercase${
                cellClass ? cellClass : ""
              }" scope="col"${
        cellClass == " prog"
          ? `data-bs-toggle="tooltip" data-bs-placement="right" title="This attribute is affected by progression"`
          : ``
      }>${key}</th>`;
    });
    content += `
            </tr>`;
  } else {
    var rowNum = 0;
    Object.keys(drAttrAverages[pos]).forEach((type) => {
      content += `
            <tr id="${pos}-row-${rowNum}"${
        selectedRowsObj[pos] == rowNum ? ` class="hover"` : ""
      }>
              <th scope="row" class="text-start"><small>${
                drAttrAverages[pos][type].name
              }</small></th>`;
      var i = 0;
      posKeys.forEach((key) => {
        cellClass = 0;
        if (drPosImportantAttr[pos].attr.indexOf(key) !== -1 || key == "awr") {
          cellClass = `imp`;
        }
        content += `
              <td${cellClass ? " class=" + cellClass : ""}>${
          drAttrAverages[pos][type].data[i]
        }</td>`;
        i++;
      });
      content += `
            </tr>`;
      rowNum++;
    });
  }

  return content;
}
function updateSettings() {
  updateCookies();
  refreshNeedsOnScreen();
  //set active tab
  $("#tabbable-" + activeTab + "-tab").tab("show");
  console.log("settings updated. activeTab: " + activeTab);

  return true;
}
function updateCookies() {
  //set cookies
  setCookie("activeTab", activeTab, {
    expires: setCookieDate(9999),
    samesite: "lax",
  });
  setCookie("positionNeeds", stringifyNeeds(), {
    expires: setCookieDate(9999),
    samesite: "lax",
  });
  setCookie("selectedRows", stringifySelectedRows(), {
    expires: setCookieDate(9999),
    samesite: "lax",
  });
  console.log("cookies updated.");

  return true;
}
function updateNeedsFromStr(cookieStr) {
  //updates position needs obj from cookie string
  //qb-0-0|hb-1-0|fb-none|wr-1-0-2-3| etc
  let positions = cookieStr.split("|");
  let posStatus = [];
  let el = "";
  positions.forEach((posStr) => {
    posStatus = [];
    posArr = posStr.split("-");
    if (posArr[1] != "none") {
      for (let i = 1; i < posArr.length; i++) {
        posStatus.push(parseInt(posArr[i]));
      }
    }
    positionNeedsObj[posArr[0]] = posStatus;
  });
  console.log("positionNeedsObj updated from string");

  return true;
}
function updateRowsFromStr(cookieStr) {
  //updates selected rows obj from cookie string
  //qb-0|hb-2|fb-none|wr-4| etc
  let positions = cookieStr.split("|");
  positions.forEach((item) => {
    let itemArr = item.split("-");
    let pos = itemArr[0];
    let rowNum = itemArr[1];
    if (rowNum == "none") {
      rowNum = null;
    } else {
      rowNum = parseInt(rowNum);
    }
    selectedRowsObj[pos] = rowNum;
  });
}
function stringifyNeeds() {
  var str = "";
  Object.keys(positionNeedsObj).forEach((pos) => {
    str += pos;
    if (positionNeedsObj[pos].length == 0) {
      str += "-none";
    }
    for (let i = 0; i < positionNeedsObj[pos].length; i++) {
      str += `-${positionNeedsObj[pos][i]}`;
    }
    str += "|";
  });
  str = str.slice(0, -1); //remove pipe at end of string
  console.log("position needs stringified: " + str);

  return str;
}
function stringifySelectedRows() {
  let str = "";
  Object.keys(selectedRowsObj).forEach((pos) => {
    str += `${pos}-${
      selectedRowsObj[pos] === null ? "none" : selectedRowsObj[pos]
    }|`;
  });
  str = str.slice(0, -1); //remove pipe at end of string
  console.log("selected rows stringified: " + str);

  return str;
}
function updatePositionQty(pos, qty) {
  //accepts position and quantity change values
  for (let i = 0; i < qty; i++) {
    positionNeedsObj[pos].push(0);
  }
  updateSettings();

  return true;
}
function updateRowSelected(pos, rowNum) {
  //accepts position and row number values
  selectedRowsObj[pos] = rowNum;
  updateSettings();

  return true;
}
function resetPositionNeeds() {
  console.log("resetting position needs");
  Object.keys(positionNeedsObj).forEach((pos) => {
    positionNeedsObj[pos] = [];
  });
  updateSettings();

  return true;
}
function refreshNeedsOnScreen() {
  var content = "",
    i = 0,
    totalNumPositions = 0,
    incomplete = 0,
    traded = 0,
    drafted = 0,
    signed = 0,
    total,
    statuses,
    border,
    buttonStyle,
    buttonText;

  //update main header
  Object.keys(positionNeedsObj).forEach((pos) => {
    if (positionNeedsObj[pos].length > 0) {
      totalNumPositions++;
      incomplete = 0;
      traded = 0;
      drafted = 0;
      signed = 0;
      for (let k = 0; k < positionNeedsObj[pos].length; k++) {
        switch (positionNeedsObj[pos][k]) {
          case 1:
            drafted++;
            break;
          case 2:
            signed++;
            break;
          case 3:
            traded++;
            break;
          default:
            incomplete++;
            break;
        }
      }
      if (incomplete == 0) {
        buttonStyle = "secondary";
        border = false;
      } else {
        buttonStyle = "danger";
        border = true;
      }
      content += `
      <div class="col-auto my-0 pt-0 pb-2">
        <button id="need-${i}-tab" type="button" class="btn btn-dark fw-bold${
        border ? " border" : ""
      }">
          ${pos.toUpperCase()}
          <span class="badge bg-${buttonStyle} ms-1">${incomplete}</span>
          <br>
          <span class="d-inline-block w-100 float-start text-center">`;
      if (drafted == 0 && signed == 0 && traded == 0) {
        content += `
            <span class="invisible badge bg-dark rounded-pill" style="font-size:0.6em">0</span>`;
      } else {
        if (drafted > 0) {
          content += `
            <span class="${
              drafted == 0 ? "invisible " : ""
            }badge bg-success rounded-pill" style="font-size:0.6em">${drafted}</span>`;
        }
        if (signed > 0) {
          content += `
            <span class="${
              signed == 0 ? "invisible " : ""
            }badge bg-primary rounded-pill" style="font-size:0.6em">${signed}</span>`;
        }
        if (traded > 0) {
          content += `
            <span class="${
              traded == 0 ? "invisible " : ""
            }badge bg-warning rounded-pill" style="font-size:0.6em">${traded}</span>`;
        }
      }
      content += `
          </span>
        </button>
      </div>`;
    }
    i++;
  });
  $("#teamNeeds .posButtons div").html(content);

  //update pane headers
  content = "";
  i = 0;
  Object.keys(positionNeedsObj).forEach((pos) => {
    statuses = positionNeedsObj[pos];
    total = statuses.length;
    if (total > 0) {
      console.log(
        "updating " + pos + " needs, total: " + total + ", [" + statuses + "]"
      );
      for (let j = 0; j < total; j++) {
        border = false;
        switch (parseInt(positionNeedsObj[pos][j])) {
          case 1:
            buttonStyle = "success";
            buttonText = "Drafted";
            break;
          case 2:
            buttonStyle = "primary";
            buttonText = "Free Agent";
            break;
          case 3:
            buttonStyle = "warning";
            buttonText = "Traded For";
            break;
          default:
            buttonStyle = "danger";
            buttonText = "Update";
            border = true;
            break;
        }
        content += `
          <div class="col">
            <div class="card bg-dark${border ? " border" : ""} mb-2">
              <div class="card-body text-center">
                <h5 class="card-title" style="white-space: nowrap">${
                  pos.toUpperCase() + " " + (j + 1)
                }</h5>
                <p class="my-0">
                  <button type="button" class="update btn btn-${buttonStyle} btn-sm text-nowrap" value="${
          pos + "-" + (j + 1)
        }">${buttonText}</button>
                </p>
              </div>
            </div>
          </div>`;
      }
    }
    $("#tabbable-" + i + " div.needs").html(content);
    content = "";
    i++;
  });

  //show/hide reset button
  if (totalNumPositions > 0) {
    $("#clearButton").show();
    $("#teamNeeds .posButtons").css("display", "inline-block");
  } else {
    $("#clearButton").hide();
    $("#teamNeeds .posButtons").hide();
  }

  return true;
}
function updatePlayerStatus(player, status) {
  //update status of player
  var pos = player[0];
  var id = player[1];
  if (status == "reset") {
    status = 0;
  }
  positionNeedsObj[pos][id - 1] = parseInt(status);

  console.log(
    "updated status of " + pos + id + " to " + drPlayerStatus[status]
  );
  console.log(pos + " statuses: " + positionNeedsObj[pos]);
  updateSettings();

  return true;
}
function deletePlayer(player) {
  //remove specified player
  var pos = player[0];
  var id = player[1] - 1;
  var statuses = positionNeedsObj[pos];
  var newStatuses = [];
  for (let i = 0; i < statuses.length; i++) {
    if (i != id) {
      newStatuses.push(statuses[i]);
    }
  }
  positionNeedsObj[pos] = newStatuses;
  console.log("player" + player + "removed");
  updateSettings();

  return true;
}
