window.__ModuleLoader__.load({
	id: "dsh-ui-sound",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		let react = require("react");
		//#region vendor/uisfx@0.4.0 (MIT, https://github.com/romainsimon/uisfx)
		var Ae=[{id:"input",label:"Input",description:"Pointer, key, and touch contact."},{id:"selection",label:"Selection",description:"Choosing, switching, and changing state."},{id:"navigation",label:"Navigation",description:"Moving through views and layers."},{id:"editing",label:"Editing",description:"Changing work with reversible and destructive actions."},{id:"movement",label:"Movement",description:"Dragging, snapping, and spatial gestures."},{id:"communication",label:"Communication",description:"Messages and attention."},{id:"feedback",label:"Feedback",description:"Clear outcomes and system status."},{id:"progress",label:"Progress",description:"Processes from start to finish."},{id:"loops",label:"Loops",description:"Continuous state while work, capture, or connection is active."},{id:"media",label:"Media",description:"Playback, seeking, and listening controls."},{id:"system",label:"System",description:"Connections, access, and device state."},{id:"reward",label:"Reward",description:"Milestones, value, and celebration."},{id:"commerce",label:"Commerce",description:"Cart, checkout, and value exchange."}],$=[{name:"hover",label:"Hover",category:"input",description:"Fine-pointer discovery without commitment.",duration:.12,baseMidi:78,notes:[{at:0,semitone:0,length:.09}],noise:.04,defaultVolume:.12},{name:"press",label:"Press",category:"input",description:"A control is physically engaged.",duration:.16,baseMidi:62,notes:[{at:0,semitone:3,length:.13,glide:-4}],noise:.14,transient:.5,defaultVolume:.2},{name:"release",label:"Release",category:"input",description:"A pressed control springs back.",duration:.18,baseMidi:68,notes:[{at:.01,semitone:-2,length:.14,glide:4}],noise:.06,transient:.3,defaultVolume:.18},{name:"double-click",label:"Double click",category:"input",description:"A rapid secondary activation.",duration:.24,baseMidi:72,notes:[{at:0,semitone:0,length:.07},{at:.105,semitone:2,length:.08}],transient:.5,defaultVolume:.2},{name:"focus",label:"Focus",category:"input",description:"A control becomes ready for keyboard or text input.",duration:.23,baseMidi:74,notes:[{at:0,semitone:-5,length:.17,glide:1},{at:0,semitone:2,length:.17,gain:.26}],noise:.015,defaultVolume:.12},{name:"long-press",label:"Long press",category:"input",description:"A sustained press reveals a secondary action.",duration:.46,baseMidi:58,notes:[{at:0,semitone:0,length:.34,glide:5},{at:.28,semitone:7,length:.13,gain:.5}],noise:.08,transient:.32,defaultVolume:.18},{name:"select",label:"Select",category:"selection",description:"An item enters the active set.",duration:.28,baseMidi:70,notes:[{at:0,semitone:0,length:.12},{at:.09,semitone:7,length:.16}],defaultVolume:.2},{name:"deselect",label:"Deselect",category:"selection",description:"An item leaves the active set.",duration:.25,baseMidi:70,notes:[{at:0,semitone:4,length:.09},{at:.075,semitone:-2,length:.15}],defaultVolume:.17},{name:"toggle-on",label:"Toggle on",category:"selection",description:"A binary setting becomes active.",duration:.3,baseMidi:67,notes:[{at:0,semitone:-3,length:.065,glide:-1},{at:.065,semitone:9,length:.2}],transient:.3,defaultVolume:.2},{name:"toggle-off",label:"Toggle off",category:"selection",description:"A binary setting becomes inactive.",duration:.29,baseMidi:67,notes:[{at:0,semitone:9,length:.065},{at:.07,semitone:-3,length:.18,glide:-1}],transient:.28,defaultVolume:.18},{name:"check",label:"Check",category:"selection",description:"A checkbox or task enters its completed state.",duration:.29,baseMidi:71,notes:[{at:0,semitone:-5,length:.075},{at:.07,semitone:9,length:.17}],transient:.24,defaultVolume:.17},{name:"uncheck",label:"Uncheck",category:"selection",description:"A checkbox or task returns to its incomplete state.",duration:.27,baseMidi:71,notes:[{at:0,semitone:9,length:.07},{at:.065,semitone:-5,length:.15}],transient:.22,defaultVolume:.15},{name:"delete",label:"Delete",category:"editing",description:"A destructive removal is committed.",duration:.48,baseMidi:58,notes:[{at:0,semitone:6,length:.2,glide:-7},{at:.16,semitone:-2,length:.24,gain:.6}],noise:.18,transient:.5,defaultVolume:.22},{name:"cancel",label:"Cancel",category:"editing",description:"A pending action is abandoned without applying.",duration:.34,baseMidi:64,notes:[{at:0,semitone:3,length:.11},{at:.08,semitone:-3,length:.2,glide:-2}],noise:.05,defaultVolume:.17},{name:"undo",label:"Undo",category:"editing",description:"The most recent change is reversed.",duration:.44,baseMidi:67,notes:[{at:0,semitone:9,length:.16,glide:-3},{at:.15,semitone:4,length:.14},{at:.27,semitone:-2,length:.13,gain:.62}],panFrom:.45,panTo:-0.45,defaultVolume:.18},{name:"redo",label:"Redo",category:"editing",description:"A reversed change is applied again.",duration:.44,baseMidi:67,notes:[{at:0,semitone:-2,length:.13,gain:.62},{at:.12,semitone:4,length:.14},{at:.25,semitone:9,length:.16,glide:2}],panFrom:-0.45,panTo:.45,defaultVolume:.18},{name:"copy",label:"Copy",category:"editing",description:"Selected content is placed on the clipboard.",duration:.3,baseMidi:70,notes:[{at:0,semitone:0,length:.14},{at:.1,semitone:12,length:.15,gain:.48}],panFrom:-0.2,panTo:.2,defaultVolume:.15},{name:"paste",label:"Paste",category:"editing",description:"Clipboard content is inserted into the current context.",duration:.36,baseMidi:67,notes:[{at:0,semitone:12,length:.08,gain:.3},{at:.065,semitone:0,length:.19},{at:.17,semitone:3,length:.14,gain:.42}],transient:.22,defaultVolume:.17},{name:"open",label:"Open",category:"navigation",description:"A menu, sheet, panel, or detail view appears.",duration:.37,baseMidi:64,notes:[{at:0,semitone:-2,length:.28,glide:9},{at:.18,semitone:12,length:.11,gain:.3}],noise:.05,defaultVolume:.18},{name:"close",label:"Close",category:"navigation",description:"A menu, sheet, panel, or detail view recedes.",duration:.34,baseMidi:64,notes:[{at:0,semitone:12,length:.1,gain:.34},{at:.055,semitone:5,length:.24,glide:-8}],noise:.04,defaultVolume:.17},{name:"back",label:"Back",category:"navigation",description:"Navigation returns to the previous place.",duration:.3,baseMidi:66,notes:[{at:0,semitone:3,length:.23,glide:-5}],noise:.08,panFrom:.35,panTo:-0.55,defaultVolume:.17},{name:"forward",label:"Forward",category:"navigation",description:"Navigation advances to the next place.",duration:.31,baseMidi:66,notes:[{at:0,semitone:-5,length:.12,glide:3,gain:.55},{at:.09,semitone:4,length:.17}],noise:.06,panFrom:-0.35,panTo:.55,defaultVolume:.17},{name:"expand",label:"Expand",category:"navigation",description:"A collapsed region reveals more detail.",duration:.37,baseMidi:64,notes:[{at:0,semitone:0,length:.12},{at:.11,semitone:4,length:.13},{at:.22,semitone:9,length:.12,gain:.52}],panFrom:0,panTo:.35,defaultVolume:.16},{name:"collapse",label:"Collapse",category:"navigation",description:"An expanded region returns to its compact state.",duration:.35,baseMidi:64,notes:[{at:0,semitone:9,length:.11,gain:.52},{at:.1,semitone:4,length:.12},{at:.2,semitone:0,length:.12}],panFrom:.35,panTo:0,defaultVolume:.15},{name:"drag-start",label:"Drag start",category:"movement",description:"An object lifts from its resting place.",duration:.28,baseMidi:57,notes:[{at:0,semitone:-2,length:.22,glide:6}],noise:.14,transient:.3,defaultVolume:.18},{name:"drop",label:"Drop",category:"movement",description:"A dragged object lands in a valid target.",duration:.3,baseMidi:55,notes:[{at:0,semitone:7,length:.1,gain:.4},{at:.045,semitone:0,length:.17,glide:-5},{at:.12,semitone:-5,length:.13,gain:.38}],noise:.18,transient:.6,defaultVolume:.22},{name:"snap",label:"Snap",category:"movement",description:"An object locks into a precise position.",duration:.16,baseMidi:73,notes:[{at:0,semitone:0,length:.1},{at:.045,semitone:12,length:.08,gain:.45}],transient:.75,defaultVolume:.2},{name:"swipe",label:"Swipe",category:"movement",description:"A touch gesture moves content spatially.",duration:.38,baseMidi:69,notes:[{at:.02,semitone:-4,length:.29,glide:8,gain:.28}],noise:.38,transient:.08,panFrom:-0.7,panTo:.7,defaultVolume:.14},{name:"reorder",label:"Reorder",category:"movement",description:"An item settles into a new position in a sequence.",duration:.34,baseMidi:61,notes:[{at:0,semitone:7,length:.1,glide:-2},{at:.085,semitone:2,length:.1},{at:.17,semitone:0,length:.13}],noise:.08,transient:.38,defaultVolume:.18},{name:"invalid-drop",label:"Invalid drop",category:"movement",description:"A dragged object cannot land in the current target.",duration:.4,baseMidi:59,notes:[{at:0,semitone:1,length:.11},{at:.12,semitone:-4,length:.13},{at:.24,semitone:1,length:.11,glide:-2,gain:.65}],noise:.14,transient:.3,defaultVolume:.19},{name:"send",label:"Send",category:"communication",description:"A message or object leaves the user.",duration:.42,baseMidi:69,notes:[{at:0,semitone:-2,length:.28,glide:9},{at:.19,semitone:12,length:.16,gain:.6}],noise:.16,panFrom:-0.2,panTo:.5,defaultVolume:.2},{name:"receive",label:"Receive",category:"communication",description:"A response or object arrives.",duration:.47,baseMidi:72,notes:[{at:0,semitone:12,length:.12,gain:.42},{at:.11,semitone:4,length:.2,glide:-2},{at:.25,semitone:0,length:.17,gain:.62}],noise:.06,panFrom:.45,panTo:0,defaultVolume:.2},{name:"notification",label:"Notification",category:"communication",description:"New information is available, without urgency.",duration:.58,baseMidi:72,notes:[{at:0,semitone:0,length:.26},{at:.19,semitone:5,length:.3}],defaultVolume:.2},{name:"mention",label:"Mention",category:"communication",description:"The user is directly addressed.",duration:.64,baseMidi:74,notes:[{at:0,semitone:0,length:.18},{at:.16,semitone:4,length:.18},{at:.32,semitone:9,length:.25}],defaultVolume:.22},{name:"typing",label:"Typing",category:"communication",description:"A brief key contact during text entry.",duration:.045,baseMidi:73,notes:[{at:0,semitone:0,length:.024,glide:-1}],noise:.025,transient:.18,defaultVolume:.065},{name:"reaction",label:"Reaction",category:"communication",description:"A lightweight social response is added.",duration:.4,baseMidi:75,notes:[{at:0,semitone:0,length:.1},{at:.075,semitone:12,length:.13,gain:.62},{at:.18,semitone:7,length:.16}],transient:.16,defaultVolume:.17},{name:"success",label:"Success",category:"feedback",description:"An action finished with the expected result.",duration:.72,baseMidi:67,notes:[{at:0,semitone:0,length:.3},{at:.16,semitone:4,length:.32},{at:.33,semitone:7,length:.33}],defaultVolume:.23},{name:"error",label:"Error",category:"feedback",description:"An action failed and needs attention.",duration:.62,baseMidi:62,notes:[{at:0,semitone:6,length:.28},{at:.22,semitone:0,length:.32,glide:-2}],noise:.1,defaultVolume:.22},{name:"warning",label:"Warning",category:"feedback",description:"A risky or consequential state needs review.",duration:.68,baseMidi:65,notes:[{at:0,semitone:0,length:.22},{at:.28,semitone:0,length:.3}],transient:.2,defaultVolume:.22},{name:"info",label:"Info",category:"feedback",description:"A neutral system fact is surfaced.",duration:.46,baseMidi:70,notes:[{at:0,semitone:0,length:.18},{at:.2,semitone:5,length:.18,gain:.58}],defaultVolume:.16},{name:"blocked",label:"Blocked",category:"feedback",description:"An action cannot continue in the current state.",duration:.43,baseMidi:57,notes:[{at:0,semitone:-5,length:.13},{at:.14,semitone:-5,length:.2,glide:-2}],noise:.12,transient:.44,defaultVolume:.2},{name:"retry",label:"Retry",category:"feedback",description:"A failed action is attempted again.",duration:.42,baseMidi:64,notes:[{at:0,semitone:-2,length:.17,glide:4},{at:.16,semitone:5,length:.21}],noise:.06,defaultVolume:.18},{name:"start",label:"Start",category:"progress",description:"A process, recording, or session begins.",duration:.46,baseMidi:60,notes:[{at:0,semitone:-5,length:.12,gain:.48},{at:.1,semitone:0,length:.18},{at:.24,semitone:7,length:.18}],noise:.04,defaultVolume:.19},{name:"stop",label:"Stop",category:"progress",description:"A process, recording, or session ends.",duration:.4,baseMidi:60,notes:[{at:0,semitone:7,length:.11},{at:.1,semitone:2,length:.12},{at:.2,semitone:-5,length:.15,gain:.72}],noise:.06,defaultVolume:.19},{name:"progress-step",label:"Progress step",category:"progress",description:"A discrete step advances inside a longer process.",duration:.23,baseMidi:72,notes:[{at:0,semitone:0,length:.07},{at:.085,semitone:3,length:.1,gain:.64}],noise:.02,defaultVolume:.12},{name:"complete",label:"Complete",category:"progress",description:"A multi-step process reaches its final state.",duration:.8,baseMidi:65,notes:[{at:0,semitone:0,length:.22},{at:.22,semitone:7,length:.25},{at:.46,semitone:12,length:.27}],defaultVolume:.24},{name:"queued",label:"Queued",category:"progress",description:"Work is accepted and waiting to begin.",duration:.36,baseMidi:64,notes:[{at:0,semitone:0,length:.14},{at:.13,semitone:2,length:.18,gain:.65}],noise:.04,defaultVolume:.14},{name:"checkpoint",label:"Checkpoint",category:"progress",description:"A meaningful stage in a longer process is saved.",duration:.5,baseMidi:69,notes:[{at:0,semitone:0,length:.18},{at:.14,semitone:5,length:.18},{at:.28,semitone:9,length:.17,gain:.6}],defaultVolume:.18},{name:"loading",label:"Loading",category:"loops",description:"A quiet repeating pulse while an interface fetches or waits.",duration:1.2,baseMidi:72,notes:[{at:0,semitone:0,length:.16},{at:.3,semitone:5,length:.16},{at:.6,semitone:2,length:.16},{at:.9,semitone:7,length:.16}],loop:true,defaultVolume:.1},{name:"processing",label:"Processing",category:"loops",description:"A restrained repeating bed while sustained work is running.",duration:1.6,baseMidi:62,notes:[{at:0,semitone:0,length:.24},{at:.4,semitone:5,length:.2,gain:.7},{at:.8,semitone:2,length:.24},{at:1.2,semitone:7,length:.2,gain:.7}],loop:true,noise:.05,defaultVolume:.08},{name:"recording",label:"Recording",category:"loops",description:"A calm periodic pulse while audio or video capture is live.",duration:1,baseMidi:67,notes:[{at:0,semitone:0,length:.2},{at:.5,semitone:0,length:.14,gain:.45}],loop:true,transient:.08,defaultVolume:.09},{name:"connecting",label:"Connecting",category:"loops",description:"A repeating search pattern while a device or live session connects.",duration:1.5,baseMidi:69,notes:[{at:0,semitone:0,length:.18},{at:.375,semitone:4,length:.18},{at:.75,semitone:7,length:.2},{at:1.125,semitone:4,length:.16,gain:.55}],loop:true,panFrom:-0.3,panTo:.3,defaultVolume:.09},{name:"scanning",label:"Scanning",category:"loops",description:"A spatial sweep repeats while content or devices are discovered.",duration:1.4,baseMidi:72,notes:[{at:0,semitone:-5,length:.28,glide:8,gain:.55},{at:.7,semitone:3,length:.28,glide:-8,gain:.45}],loop:true,noise:.12,panFrom:-0.65,panTo:.65,defaultVolume:.075},{name:"streaming",label:"Streaming",category:"loops",description:"A quiet repeating flow while live data or media continues.",duration:1.2,baseMidi:65,notes:[{at:0,semitone:0,length:.2},{at:.3,semitone:7,length:.16,gain:.5},{at:.6,semitone:2,length:.2},{at:.9,semitone:9,length:.16,gain:.5}],loop:true,noise:.08,panFrom:-0.2,panTo:.2,defaultVolume:.07},{name:"play",label:"Play",category:"media",description:"Media playback begins or resumes.",duration:.34,baseMidi:67,notes:[{at:0,semitone:-5,length:.09,gain:.52},{at:.075,semitone:0,length:.11},{at:.16,semitone:7,length:.13,gain:.72}],transient:.2,defaultVolume:.18},{name:"pause",label:"Pause",category:"media",description:"Media playback pauses at the current position.",duration:.32,baseMidi:67,notes:[{at:0,semitone:4,length:.11},{at:.13,semitone:4,length:.13}],transient:.25,defaultVolume:.17},{name:"seek",label:"Seek",category:"media",description:"The playback position moves to a new point.",duration:.3,baseMidi:72,notes:[{at:0,semitone:-5,length:.105,glide:2,gain:.55},{at:.115,semitone:5,length:.12,glide:2,gain:.72}],noise:.15,panFrom:-0.55,panTo:.55,defaultVolume:.13},{name:"volume-change",label:"Volume change",category:"media",description:"Playback loudness moves to a new level.",duration:.24,baseMidi:76,notes:[{at:0,semitone:-4,length:.055,gain:.45},{at:.055,semitone:0,length:.065,gain:.62},{at:.115,semitone:4,length:.08}],noise:.02,defaultVolume:.11},{name:"skip-next",label:"Skip next",category:"media",description:"Playback advances to the next item.",duration:.29,baseMidi:70,notes:[{at:0,semitone:0,length:.075,gain:.58},{at:.07,semitone:4,length:.085},{at:.145,semitone:12,length:.105,gain:.78}],panFrom:-0.35,panTo:.55,defaultVolume:.16},{name:"skip-previous",label:"Skip previous",category:"media",description:"Playback returns to the previous item.",duration:.29,baseMidi:70,notes:[{at:0,semitone:12,length:.075,gain:.78},{at:.07,semitone:4,length:.085},{at:.145,semitone:0,length:.105,gain:.58}],panFrom:.55,panTo:-0.35,defaultVolume:.16},{name:"connect",label:"Connect",category:"system",description:"A device, service, or live session becomes available.",duration:.62,baseMidi:64,notes:[{at:0,semitone:0,length:.22},{at:.18,semitone:5,length:.23},{at:.37,semitone:12,length:.18,gain:.55}],defaultVolume:.2},{name:"disconnect",label:"Disconnect",category:"system",description:"A device, service, or live session goes offline.",duration:.58,baseMidi:64,notes:[{at:0,semitone:12,length:.21},{at:.18,semitone:5,length:.22},{at:.34,semitone:0,length:.18,gain:.6}],noise:.06,defaultVolume:.19},{name:"lock",label:"Lock",category:"system",description:"Access closes or a protected state engages.",duration:.34,baseMidi:55,notes:[{at:0,semitone:4,length:.14,glide:-4},{at:.11,semitone:0,length:.17,gain:.7}],transient:.55,defaultVolume:.2},{name:"unlock",label:"Unlock",category:"system",description:"Access opens or a protected state disengages.",duration:.45,baseMidi:62,notes:[{at:0,semitone:-2,length:.1},{at:.095,semitone:5,length:.14},{at:.21,semitone:12,length:.18,glide:2}],transient:.3,defaultVolume:.2},{name:"wake",label:"Wake",category:"system",description:"A device or dormant interface becomes active.",duration:.46,baseMidi:61,notes:[{at:0,semitone:-5,length:.31,glide:9},{at:.24,semitone:7,length:.16,gain:.45}],noise:.06,defaultVolume:.17},{name:"sleep",label:"Sleep",category:"system",description:"A device or interface enters a dormant state.",duration:.48,baseMidi:61,notes:[{at:0,semitone:7,length:.26,glide:-7},{at:.21,semitone:-2,length:.2,gain:.5}],noise:.08,defaultVolume:.15},{name:"reward",label:"Reward",category:"reward",description:"The user receives a small unit of value.",duration:.64,baseMidi:76,notes:[{at:0,semitone:0,length:.22},{at:.1,semitone:12,length:.24},{at:.26,semitone:7,length:.29}],transient:.35,defaultVolume:.22},{name:"level-up",label:"Level up",category:"reward",description:"Capability, rank, or progression increases.",duration:.92,baseMidi:64,notes:[{at:0,semitone:0,length:.24},{at:.17,semitone:4,length:.25},{at:.34,semitone:7,length:.26},{at:.51,semitone:12,length:.32}],defaultVolume:.25},{name:"achievement",label:"Achievement",category:"reward",description:"A rare milestone deserves a fuller celebration.",duration:1.16,baseMidi:62,notes:[{at:0,semitone:0,length:.34},{at:.16,semitone:7,length:.34},{at:.34,semitone:12,length:.38},{at:.56,semitone:16,length:.42},{at:.73,semitone:19,length:.38}],defaultVolume:.26},{name:"streak",label:"Streak",category:"reward",description:"Repeated participation extends an active streak.",duration:.72,baseMidi:69,notes:[{at:0,semitone:0,length:.17},{at:.14,semitone:2,length:.18},{at:.28,semitone:4,length:.19},{at:.43,semitone:7,length:.21}],defaultVolume:.21},{name:"badge",label:"Badge",category:"reward",description:"A collectible distinction is awarded.",duration:.8,baseMidi:71,notes:[{at:0,semitone:0,length:.19},{at:.14,semitone:9,length:.23},{at:.33,semitone:16,length:.35}],transient:.2,defaultVolume:.22},{name:"bonus",label:"Bonus",category:"reward",description:"An unexpected extra reward is revealed.",duration:.86,baseMidi:66,notes:[{at:0,semitone:0,length:.18},{at:.12,semitone:4,length:.19},{at:.25,semitone:9,length:.23},{at:.43,semitone:16,length:.34}],transient:.3,defaultVolume:.24},{name:"add-to-cart",label:"Add to cart",category:"commerce",description:"An item enters a cart or pending order.",duration:.49,baseMidi:70,notes:[{at:0,semitone:-2,length:.1,gain:.52},{at:.105,semitone:7,length:.18},{at:.26,semitone:2,length:.17,gain:.58}],transient:.28,defaultVolume:.19},{name:"remove-from-cart",label:"Remove from cart",category:"commerce",description:"An item leaves a cart or pending order.",duration:.45,baseMidi:70,notes:[{at:0,semitone:10,length:.1,gain:.55},{at:.1,semitone:3,length:.14},{at:.22,semitone:-2,length:.16,gain:.64}],transient:.22,defaultVolume:.17},{name:"checkout",label:"Checkout",category:"commerce",description:"A cart advances into the payment flow.",duration:.66,baseMidi:65,notes:[{at:0,semitone:0,length:.22},{at:.18,semitone:5,length:.23},{at:.35,semitone:9,length:.24}],defaultVolume:.2},{name:"purchase",label:"Purchase",category:"commerce",description:"A paid transaction or value exchange completes.",duration:.76,baseMidi:69,notes:[{at:0,semitone:-5,length:.12},{at:.11,semitone:0,length:.24},{at:.28,semitone:7,length:.32}],noise:.12,transient:.55,defaultVolume:.22},{name:"coupon",label:"Coupon",category:"commerce",description:"A discount or promotional code is accepted.",duration:.52,baseMidi:72,notes:[{at:0,semitone:0,length:.16},{at:.13,semitone:4,length:.18},{at:.26,semitone:9,length:.21}],transient:.16,defaultVolume:.18},{name:"refund",label:"Refund",category:"commerce",description:"Value returns after a completed transaction.",duration:.7,baseMidi:67,notes:[{at:0,semitone:7,length:.24},{at:.19,semitone:2,length:.25},{at:.39,semitone:0,length:.23,gain:.65}],panFrom:.35,panTo:-0.2,defaultVolume:.2}],ee=[{name:"minimal",label:"Minimal",description:"Dry, precise, almost invisible.",bestFor:"Productivity, SaaS, system UI",color:"#e84d2a",waveform:"sine",pitch:1,duration:.78,attack:.004,decay:2.3,noise:.05,transient:.15,brightness:.78,echo:0,bitDepth:16,harmonics:[[1,1],[2,.08]]},{name:"soft",label:"Soft",description:"Rounded felt, warm and reassuring.",bestFor:"Mobile, wellness, friendly SaaS",color:"#d47b83",waveform:"triangle",pitch:.9,duration:1.08,attack:.012,decay:1.65,noise:.08,transient:.08,brightness:.46,echo:.04,bitDepth:16,harmonics:[[1,1],[2,.14],[3,.04]]},{name:"glass",label:"Glass",description:"Bright, crystalline, and premium.",bestFor:"Media, finance, luxury products",color:"#4c8ca5",waveform:"sine",pitch:1.22,duration:1.22,attack:.003,decay:1.32,noise:.025,transient:.12,brightness:.95,echo:.09,bitDepth:16,harmonics:[[1,1],[2.72,.28],[4.19,.11],[6.8,.05]]},{name:"arcade",label:"Arcade",description:"Chunky pixels and cheerful voltage.",bestFor:"Games, streaks, gamified learning",color:"#7257d9",waveform:"square",pitch:1.08,duration:.86,attack:.002,decay:1.1,noise:.035,transient:.2,brightness:.72,echo:.025,bitDepth:8,harmonics:[[1,1],[2,.08]]},{name:"mechanical",label:"Mechanical",description:"Switches, relays, and firm detents.",bestFor:"Devtools, hardware, industrial UI",color:"#68736f",waveform:"triangle",pitch:.74,duration:.72,attack:.001,decay:2.8,noise:.24,transient:.72,brightness:.58,echo:.015,bitDepth:12,harmonics:[[1,1],[1.5,.13],[2.1,.08]]},{name:"organic",label:"Organic",description:"Wood, water, breath, and small stones.",bestFor:"Education, kids, calm games",color:"#718b4e",waveform:"sine",pitch:.94,duration:1.12,attack:.008,decay:1.85,noise:.18,transient:.28,brightness:.4,echo:.055,bitDepth:16,harmonics:[[1,1],[1.48,.18],[2.02,.09],[3.05,.035]]},{name:"dreamy",label:"Dreamy",description:"Airy blooms, soft light, and slow sparkle.",bestFor:"Creative tools, wellness, ambient apps",color:"#a36cad",waveform:"sine",pitch:1.05,duration:1.18,attack:.02,decay:1.42,noise:.045,transient:.045,brightness:.56,echo:.13,bitDepth:16,harmonics:[[1,1],[2,.12],[3.01,.07],[5.02,.025]]},{name:"scifi",label:"Sci-fi",description:"Clean holographic pings with a restrained digital shimmer.",bestFor:"AI tools, spatial UI, futuristic games",color:"#20a29d",waveform:"sine",pitch:1.1,duration:.84,attack:.0025,decay:2.05,noise:.025,transient:.16,brightness:.82,echo:.035,bitDepth:16,harmonics:[[1,1],[2.01,.11],[3.98,.025]],fmRatio:2.01,fmDepth:.42},{name:"rubber",label:"Rubber",description:"Tactile elastic taps with a quick, friendly rebound.",bestFor:"Kids, playful mobile, casual games",color:"#d99a24",waveform:"triangle",pitch:.86,duration:.88,attack:.0035,decay:2.2,noise:.018,transient:.22,brightness:.5,echo:.012,bitDepth:16,harmonics:[[1,1],[1.5,.075],[2.02,.04]],elasticity:1.15},{name:"cinematic",label:"Cinematic",description:"Deep impacts, polished tails, and quiet scale.",bestFor:"Premium media, games, dramatic moments",color:"#3f5873",waveform:"sine",pitch:.7,duration:1.28,attack:.008,decay:1.78,noise:.12,transient:.55,brightness:.38,echo:.11,bitDepth:16,harmonics:[[1,1],[.5,.22],[2,.1],[3,.035]]},{name:"studio",label:"Studio",description:"Tactile editing precision with warm cinematic restraint.",bestFor:"Film, audio, and AI creative tools",color:"#6261a8",waveform:"triangle",pitch:.86,duration:.82,attack:.004,decay:2.15,noise:.09,transient:.24,brightness:.48,echo:.025,bitDepth:16,harmonics:[[1,1],[2,.11],[3,.035]]},{name:"zen",label:"Zen",description:"Pure tones, dry wood, and brief washi detail.",bestFor:"Mindfulness, reading, writing, calm productivity",color:"#7d8f77",waveform:"sine",pitch:.94,duration:.82,attack:.003,decay:2.7,noise:0,transient:.025,brightness:.52,echo:0,bitDepth:16,harmonics:[[1,1],[2.01,.035]],paper:.12,brush:.065,wood:.16,chime:.09}],te=$.map(e=>e.name),W=ee.map(e=>e.name);function J(e){let a=$.find(n=>n.name===e);if(!a)throw new Error(`Unknown UI SFX cue: ${e}`);return a}function Ne(e){return J(e).loop?"loop":"one-shot"}function ne(e){let a=ee.find(n=>n.name===e);if(!a)throw new Error(`Unknown UI SFX pack: ${e}`);return a}function ge(e){return 440*2**((e-69)/12)}var fe=new Set(["press","release","double-click","long-press","select","deselect","toggle-on","toggle-off","check","uncheck","open","close","copy","paste","delete","cancel","drag-start","drop","snap","reorder","play","pause","seek","skip-next","skip-previous","lock","unlock","add-to-cart","remove-from-cart","checkout","purchase"]),Ve=new Set(["success","complete","checkpoint","reward","level-up","achievement","bonus"]),Fe=new Set([...fe,"blocked","progress-step","stop","invalid-drop"]),Ee=new Set(["press","release","long-press","delete","paste","drag-start","drop","reorder","invalid-drop","send","receive","notification","success","error","warning","blocked","start","stop","complete","connect","disconnect","lock","reward","level-up","achievement","bonus","purchase","refund"]),pe=new Set(["open","expand","copy","send","receive","notification","mention","reaction","success","info","complete","checkpoint","connect","unlock","wake","reward","level-up","achievement","streak","badge","bonus","checkout","purchase","coupon"]),Te=new Set(["long-press","delete","cancel","drop","invalid-drop","send","receive","success","error","warning","blocked","start","stop","complete","connect","disconnect","lock","sleep","reward","level-up","achievement","badge","bonus","purchase","refund"]),Ie=new Set(["press","release","double-click","long-press","toggle-on","toggle-off","check","uncheck","drag-start","drop","snap","reorder","invalid-drop","reaction","success","blocked","retry","play","pause","lock","unlock","reward","level-up","achievement","streak","badge","bonus","add-to-cart","remove-from-cart","purchase"]),Ue=new Set(["copy","paste","open","close","expand","collapse","drag-start","drop","swipe","reorder","send","receive","add-to-cart","remove-from-cart","checkout","refund"]),De=new Set(["undo","redo","back","forward","swipe","send","receive","wake","sleep"]),Re=new Set(["press","release","double-click","long-press","select","deselect","toggle-on","toggle-off","check","uncheck","delete","paste","drop","snap","invalid-drop","notification","mention","success","error","warning","blocked","retry","checkpoint","connect","disconnect","lock","unlock","reward","badge","add-to-cart","remove-from-cart","checkout","purchase"]),Oe=new Set(["send","receive","notification","mention","reaction","success","error","warning","info","retry","complete","checkpoint","connect","disconnect","wake","reward","level-up","achievement","streak","badge","bonus","checkout","purchase","coupon","refund"]),he=new Set(["hover","press","release","double-click","focus","select","deselect","toggle-on","toggle-off","check","uncheck","snap","typing","progress-step","seek","volume-change"]);function j(e,a){let n=2166136261^a;for(let i=0;i<e.length;i+=1)n^=e.charCodeAt(i),n=Math.imul(n,16777619);return (n>>>0)/4294967295}function Xe(e){return {paper:Ue.has(e)?.72+j(e,1)*.28:0,brush:De.has(e)?.68+j(e,2)*.32:0,wood:Re.has(e)?.7+j(e,3)*.3:0,chime:Oe.has(e)?.64+j(e,4)*.36:0}}function _e(e,a,n,i){let r=n.map(t=>({...t}));switch(e){case "soft":return r.map((t,s)=>({...t,at:i?t.at:t.at*1.06+s*.006,length:t.length*1.13,semitone:t.semitone*.94}));case "glass":{if(i||r.length===0||!pe.has(a))return r;let t=r[r.length-1];return t?[...r,{...t,at:t.at+Math.min(.08,t.length*.28),semitone:t.semitone+12,length:t.length*.68,gain:(t.gain??1)*.18}]:r}case "arcade":return r.map((t,s)=>({...t,at:i?t.at:Math.round(t.at/.04)*.04,length:Math.max(.06,Math.round(t.length/.04)*.04)*.82,semitone:Math.round(t.semitone)+(s%2===1?.25:0)}));case "mechanical":return [...i||!Fe.has(a)?[]:[{at:0,semitone:-12,length:.055,glide:-3,gain:.28}],...r.map(t=>({...t,length:t.length*.62,gain:(t.gain??1)*.82}))];case "organic":return r.flatMap((t,s)=>{let d={...t,at:i?t.at:t.at+s*.009,semitone:t.semitone+(s%2===0?-0.16:.11)};return i||s!==0||!Ee.has(a)?[d]:[d,{...t,at:t.at+.018,semitone:t.semitone-12.08,length:t.length*.52,gain:(t.gain??1)*.2}]});case "dreamy":return r.flatMap((t,s)=>[{...t,at:i?t.at:t.at*1.08,length:t.length*1.18,gain:(t.gain??1)*.78},...i||!pe.has(a)?[]:[{...t,at:t.at*1.08+.07+s*.012,semitone:t.semitone+12.02,length:t.length*.82,gain:(t.gain??1)*.13}]]);case "scifi":return r.map((t,s)=>({...t,at:i?t.at:Math.round(t.at/.01)*.01,length:t.length*.72,semitone:t.semitone+(s%2===0?-0.04:.16),glide:(t.glide??0)*.58+(t.glide===void 0?s%2===0?.45:-0.25:0),gain:(t.gain??1)*(s===0?1:.9)}));case "rubber":return r.map((t,s)=>({...t,at:i?t.at:t.at*.98+s*.004,length:t.length*.84,semitone:t.semitone+(s%2===0?-0.18:.08),glide:(t.glide??0)*.52,gain:(t.gain??1)*(s===0?1:.88)}));case "cinematic":return [...r.map(t=>({...t,length:t.length*1.16,gain:(t.gain??1)*.72})),...i||r.length===0||!Te.has(a)?[]:[{at:0,semitone:-24,length:Math.min(.38,Math.max(...r.map(t=>t.length))),glide:-2,gain:.28}]];case "studio":{let t=r.map(s=>({...s,at:i?s.at:s.at*.92,length:s.length*.82,gain:(s.gain??1)*(i?.55:.8)}));if(i||t.length===0)return t;if(fe.has(a))return [{at:0,semitone:-12,length:.045,glide:-2,gain:.12},...t];if(Ve.has(a)){let s=t[t.length-1];return s?[...t,{...s,at:s.at+.055,semitone:s.semitone+12,length:s.length*.55,gain:(s.gain??1)*.1}]:t}return t}case "zen":{let t=j(a,0),s=i?.68:he.has(a)?.46:.68;return r.map((d,c)=>({...d,at:i?d.at:d.at*(.9+t*.025)+c*.002,length:d.length*s*(.96+t*.05),semitone:d.semitone+(t-.5)*.22+(c%2===0?-0.035:.025),glide:d.glide===void 0?void 0:d.glide*.28,gain:(d.gain??1)*(i?.32:he.has(a)?.48:.52)}))}default:return r}}function Z(e,a){let n=J(a),i=ne(e),r=n.loop?1:i.duration,s=_e(e,a,n.notes,n.loop??false).map(b=>{let f=n.baseMidi+b.semitone+12*Math.log2(i.pitch),R=f+(b.glide??0);return {...b,at:b.at*r,length:b.length*r,frequency:ge(f),endFrequency:ge(R)}}),d=n.loop?n.duration:Math.max(n.duration*r,...s.map(b=>b.at+b.length+.02)),c=1.5-.024-i.echo*1.6;if(!n.loop&&d>c){let b=(c-.02)/(d-.02);s=s.map(f=>({...f,at:f.at*b,length:f.length*b})),d=c;}let g=i.noise,F=n.noise??0,E=Math.min(1,(n.transient??0)*(.7+i.transient*.3)+i.transient*.45)*(n.loop?.58:1),A=(i.fmDepth??0)*(n.loop?.58:n.category==="reward"?1.12:1),x=(i.elasticity??0)*(n.loop?.18:Ie.has(a)?1:.36),w=e==="zen"?Xe(a):void 0;return {cue:a,pack:e,duration:d,notes:s,waveform:i.waveform,harmonics:i.harmonics,attack:i.attack,decay:i.decay,noise:e==="zen"?0:Math.min(.42,F*(.55+g)+g*.025),transient:e==="zen"?Math.min(.12,E*.28):E,brightness:i.brightness,echo:a==="typing"?Math.min(i.echo,.004):i.echo,bitDepth:i.bitDepth,panFrom:n.panFrom??0,panTo:n.panTo??n.panFrom??0,loop:n.loop??false,defaultVolume:n.defaultVolume,fmRatio:i.fmRatio??1,fmDepth:A,elasticity:x,paper:(i.paper??0)*(w?.paper??0),brush:(i.brush??0)*(w?.brush??0),wood:(i.wood??0)*(w?.wood??0),chime:(i.chime??0)*(w?.chime??0)}}function be(e){let a=2166136261;for(let n=0;n<e.length;n+=1)a^=e.charCodeAt(n),a=Math.imul(a,16777619);return a>>>0}function ye(e){let a=e;return ()=>{a+=1831565813;let n=a;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function ae(e,a){if(a<=0||a>=.5)return 0;if(e<a){let n=e/a;return n+n-n*n-1}if(e>1-a){let n=(e-1)/a;return n*n+n+n+1}return 0}function Be(e,a,n){let i=e/(Math.PI*2),r=i-Math.floor(i);switch(a){case "square":return (r<.5?1:-1)+ae(r,n)-ae((r+.5)%1,n);case "saw":return 2*r-1-ae(r,n);case "triangle":return 2*Math.abs(2*(i-Math.floor(i+.5)))-1;default:return Math.sin(e)}}function ve(e,a,n,i){if(e<0||e>a)return 0;if(e<n)return e/Math.max(n,1e-4);let r=(e-n)/Math.max(a-n,1e-4);return Math.max(0,1-r)**i}function qe(e){return Math.tanh(e*1.2)/Math.tanh(1.2)}function oe(e,a=44100){let n=Math.max(0,...e.notes.map(m=>m.at+m.length)),i=e.cue==="typing"?.048:.024,r=e.loop?e.duration:Math.min(e.duration,n+(e.pack==="zen"?.12:.06)),t=e.loop?0:i+e.echo*1.6,s=Math.max(1,Math.round((r+t)*a)),d=new Float32Array(s),c=new Float32Array(s),g=ye(be(`${e.pack}:${e.cue}`)),F=ye(be(`${e.pack}:${e.cue}:materials`)),E=new Float64Array(e.notes.length),A=0,x=0,w=0,b=0,f=0,R=e.loop?Math.max(.0018,e.attack):e.attack,O=e.paper>0||e.brush>0||e.wood>0||e.chime>0;for(let m=0;m<s;m+=1){let N=m/a,y=0,z=0,X=0,T=0;for(let p=0;p<e.notes.length;p+=1){let u=e.notes[p];if(!u)continue;let h=N-u.at;if(h<0||h>u.length)continue;let V=h/u.length,D=u.frequency*(u.endFrequency/u.frequency)**V,q=e.elasticity*Math.exp(-h*19)*Math.cos(Math.PI*2*12.5*h),G=D*2**(q/12);E[p]=(E[p]??0)+Math.PI*2*G/a;let de=E[p]??0,Se=e.fmDepth>0?Math.sin(de*e.fmRatio)*e.fmDepth*Math.exp(-h*7.5):0,me=0;for(let[ue,xe]of e.harmonics)me+=Be(de*ue+Se,e.waveform,Math.min(.49,G*ue/a))*xe;let Y=u.gain??1,Ce=ve(h,u.length,R,e.decay);y+=me*Ce*Y,z+=ve(h,u.length,Math.min(.004,R),Math.max(2.35,e.decay*1.25))*Y;let Pe=1-Math.exp(-h*800);X+=Pe*Math.exp(-h*(105+e.brightness*170))*Y;}let o=g()*2-1,l=F()*2-1;x+=(l-x)*.08,w+=(l-w)*.018,b+=(l-b)*.004;let v=x-w,P=w-b;if(O)for(let p of e.notes){let u=N-p.at;if(!(u<0)){if(e.paper>0){let h=Math.min(p.length,.075,Math.max(.028,p.length*.62));if(u<=h){let V=u/h,D=Math.sin(Math.PI*V)**1.1*(1-V*.48),q=Math.exp(-(((u-h*.24)/.003)**2)),G=Math.exp(-(((u-h*.64)/.005)**2));T+=v*e.paper*D*(.16+q*.52+G*.24);}}if(e.brush>0){let h=Math.min(p.length,.11,Math.max(.045,p.length*.95));if(u<=h){let V=u/h,D=Math.sin(Math.PI*V)**1.3;T+=P*e.brush*D*(.42+V*.08);}}if(e.wood>0){let h=Math.min(p.length,.22,Math.max(.09,p.length*.8));if(u<=h){let V=1-Math.exp(-u*480),D=Math.exp(-u*18),q=Math.sin(Math.PI*2*p.frequency*.31*u),G=Math.sin(Math.PI*2*p.frequency*.47*u+.3)*.34;T+=(q+G)*e.wood*V*D;}}if(e.chime>0){let h=Math.min(p.length,.42,Math.max(.16,p.length*1.25));if(u<=h){let V=1-Math.exp(-u*520),D=Math.exp(-u*7.4),q=Math.sin(Math.PI*2*p.frequency*2.01*u)+Math.sin(Math.PI*2*p.frequency*3.87*u+.4)*.28;T+=q*e.chime*V*D;}}}}let S=520+e.brightness*4800,C=1-Math.exp(-Math.PI*2*S/a);A+=(o-A)*C;let M=o-A,_=(M*(.52+e.brightness*.28)+A*(.18-e.brightness*.08))*e.noise*Math.min(1.4,z),B=M*e.transient*Math.min(1.35,X),U=e.pack==="zen",k=y*(U?.58:.62)+_*(U?.1:.32)+B*(U?.08:.3)+T*(U?.34:0);if(e.bitDepth<16){let p=2**e.bitDepth;k=Math.round(k*p)/p;}let H=Math.min(1,N/Math.max(e.duration,.001)),le=((e.loop?(e.panFrom+e.panTo)/2-(e.panTo-e.panFrom)/2*Math.cos(Math.PI*2*H):e.panFrom+(e.panTo-e.panFrom)*H)+1)*Math.PI/4,ce=U?k:qe(k);d[m]=ce*Math.cos(le),c[m]=ce*Math.sin(le);}if(e.echo>0&&!e.loop){let m=Math.floor((.035+e.echo*.38)*a),N=Math.min(.22,e.echo*1.65);for(let y=m;y<s;y+=1)d[y]+=d[y-m]*N,c[y]+=c[y-m]*N;}if(!e.loop){let m=Math.min(s,Math.round(.028*a)),N=s-m;for(let y=N;y<s;y+=1){let z=(s-1-y)/Math.max(1,m-1),X=Math.sin(z*Math.PI/2)**2;d[y]*=X,c[y]*=X;}}for(let m=0;m<s;m+=1)f=Math.max(f,Math.abs(d[m]),Math.abs(c[m]));let L=e.cue==="typing"?e.pack==="zen"?.15:.28:e.pack==="zen"?e.loop?.18:e.cue==="hover"?.15:.28:e.loop?.32:e.cue==="hover"?.3:.42,K=f>0?Math.min(2.2,L/f):1;f=0;for(let m=0;m<s;m+=1)d[m]*=K,c[m]*=K,f=Math.max(f,Math.abs(d[m]),Math.abs(c[m]));return {sampleRate:a,duration:s/a,left:d,right:c,peak:f}}function Le(){if(typeof window>"u")return;let e=window;return window.AudioContext??e.webkitAudioContext}function Q(e,a){return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(1,e)):a}function ze(e){return typeof e=="number"&&Number.isFinite(e)?Math.max(1,Math.min(32,Math.round(e))):8}function Ge(){return new Promise(e=>setTimeout(e,0))}var He={hover:60,focus:80,"progress-step":80,"volume-change":60},Me=.018;function $e(e,a){return typeof e=="number"&&Number.isFinite(e)?Math.max(0,Math.min(1e4,e)):a}function We(e){if(e){if(e.storage)return e.storage;if(!(typeof window>"u"))try{return window.localStorage}catch{return}}}function je(e,a){if(!e)return {};try{let n=JSON.parse(e.getItem(a)??"{}");return {pack:typeof n.pack=="string"&&W.includes(n.pack)?n.pack:void 0,volume:typeof n.volume=="number"?Q(n.volume,1):void 0,enabled:typeof n.enabled=="boolean"?n.enabled:void 0}}catch{return {}}}function ie(e={}){let a=e.preferences?.key??"uisfx:preferences",n=We(e.preferences),i=je(n,a),r=e.pack??i.pack??"minimal",t=Q(e.volume??i.volume,1),s=e.enabled??i.enabled??true,d=ze(e.maxVoices),c=e.context,g,F=new Map,E=new WeakSet,A=new Map,x=new Map,w=new Set,b=new Map;function f(){if(n)try{n.setItem(a,JSON.stringify({pack:r,volume:t,enabled:s}));}catch{}}function R(o){let l=A.get(o);if(!l||E.has(o))return;E.add(o);let v=c?.currentTime??0;try{l.gain.gain.cancelScheduledValues(v),l.gain.gain.setValueAtTime(l.gain.gain.value,v),l.gain.gain.linearRampToValueAtTime(0,v+.015),o.stop(v+Me);}catch{}}function O(o){o.finished||(o.finished=true,w.delete(o),x.get(o.cue)===o&&x.delete(o.cue),o.resolveEnded());}function L(){if(c)return c;let o=Le();if(o)return c=new o({latencyHint:"interactive"}),c}function K(o){return g||(g=o.createGain(),g.gain.value=t,g.connect(o.destination),g)}function m(o){let l=L();if(!l)return;let v=`${r}:${o}:${l.sampleRate}`,P=F.get(v);if(P)return P;let S=oe(Z(r,o),l.sampleRate),C=l.createBuffer(2,S.left.length,S.sampleRate);return C.getChannelData(0).set(S.left),C.getChannelData(1).set(S.right),F.set(v,C),C}function N(o){let l=L(),v=m(o.cue);if(!l||!v)return  false;l.state==="suspended"&&l.resume();let P=[...A.entries()].filter(([_])=>!E.has(_)),S;if(P.length>=d){let B=P.find(([,U])=>!U.playback.loop)??P[0];B&&(B[1].playback.playing.stop(),S=l.currentTime+Me);}let C=Z(r,o.cue),M=l.createBufferSource(),I=l.createGain();return M.buffer=v,M.loop=o.loop,M.playbackRate.value=Math.max(.25,Math.min(4,o.options.playbackRate??1)),I.gain.value=Q(o.options.volume,C.defaultVolume),M.connect(I),I.connect(K(l)),o.source=M,M.addEventListener("ended",()=>{A.delete(M),M.disconnect(),I.disconnect(),o.source===M&&(o.source=void 0,O(o));},{once:true}),A.set(M,{gain:I,playback:o}),S===void 0?M.start():M.start(S),true}function y(o,l={}){if(!s)return null;let v=Z(r,o),P=l.loop??v.loop,S=l.retrigger??(P?"ignore":"restart"),C=x.get(o),M=$e(l.cooldownMs??e.cooldownMs,He[o]??0),I=performance.now(),_=b.get(o);if(_!==void 0&&I-_<M)return C?.playing??null;if(C&&S==="ignore")return C.playing;C&&S==="restart"&&C.playing.stop();let B=()=>{},U=new Promise(re=>{B=re;}),k,H={stop(){k.stopped||(k.stopped=true,x.get(o)===k&&x.delete(o),k.source?R(k.source):O(k));},ended:U};return k={cue:o,options:l,loop:P,retrigger:S,playing:H,stopped:false,finished:false,resolveEnded:B},w.add(k),S!=="overlap"&&x.set(o,k),N(k)?(b.set(o,I),H):(O(k),null)}async function z(o=$.map(v=>v.name),l={}){if(L())for(let P of o){if(l.signal?.aborted||(await Ge(),l.signal?.aborted))return;m(P);}}async function X(){let o=L();if(!o)return  false;if(o.state==="running")return  true;try{return await o.resume(),o.state==="running"}catch{return  false}}function T(){for(let o of [...w])o.playing.stop();}return {unlock:X,play:y,preload:z,setPack(o){if(r!==o){r=o,f();for(let l of [...w])!l.loop||l.stopped||!l.source||(R(l.source),N(l)||O(l));}},getPack(){return r},setVolume(o){if(t=Q(o,t),f(),!g||!c)return;let l=c.currentTime;typeof g.gain.cancelAndHoldAtTime=="function"?g.gain.cancelAndHoldAtTime(l):(g.gain.cancelScheduledValues(l),g.gain.setValueAtTime(g.gain.value,l)),g.gain.linearRampToValueAtTime(t,l+.02);},getVolume(){return t},setEnabled(o){s=o,f(),s||T();},isEnabled(){return s},stopAll:T,async destroy(){T();for(let o of [...w])O(o);F.clear(),g?.disconnect(),g=void 0,c&&c!==e.context&&await c.close(),c=void 0;}}}function Ze(e,a,n="mp3"){return `sounds/${e}/${a}.${n}`}function we(e){return !!(e&&te.includes(e))}function Ke(e){return !!(e&&W.includes(e))}function se(e,a){if(!(e instanceof Element))return;let n=e.closest(`[${a}]`),i=n?.dataset[a.replace("data-","").replace(/-([a-z])/g,(r,t)=>t.toUpperCase())];return n&&we(i)?{element:n,cue:i}:void 0}function ke(e,a){return se(e,a)?.cue}function Je(e=document,a={}){let n=a.player??ie(a),i=d=>{if(!(d.target instanceof Element))return;let c=d.target.closest("[data-uisfx]"),g=c?.dataset.uisfx,F=c?.dataset.uisfxPack;Ke(F)&&n.setPack(F),we(g)&&n.play(g);},r=d=>{if(!(d instanceof PointerEvent)||d.pointerType==="touch")return;let c=se(d.target,"data-uisfx-hover"),g=se(d.relatedTarget,"data-uisfx-hover");c&&c.element!==g?.element&&n.play(c.cue);},t=d=>{let c=ke(d.target,"data-uisfx-press");c&&n.play(c);},s=d=>{let c=ke(d.target,"data-uisfx-release");c&&n.play(c);};return e.addEventListener("click",i),e.addEventListener("pointerover",r),e.addEventListener("pointerdown",t),e.addEventListener("pointerup",s),{player:n,unbind(){e.removeEventListener("click",i),e.removeEventListener("pointerover",r),e.removeEventListener("pointerdown",t),e.removeEventListener("pointerup",s);}}}
		//#endregion

		//#region uisfx preferences + bridge
		const NS = "ui-sound";
		/**
		 * Route prefix of this plugin's own Host half. The stock bundle used
		 * `/uisfx/api/settings`; keeping one prefix per package means the two
		 * plugins can coexist without fighting over the same route.
		 */
		const API_BASE = "/ui-sound/api/settings";
		const SCENARIO_DEFS = [
  {
    "id": "task.start"
  },
  {
    "id": "task.success"
  },
  {
    "id": "task.failure"
  },
  {
    "id": "task.pending"
  },
  {
    "id": "click.normal"
  },
  {
    "id": "click.primary"
  },
  {
    "id": "click.toggle"
  },
  {
    "id": "click.send"
  },
  {
    "id": "click.close"
  },
  {
    "id": "click.danger"
  },
  {
    "id": "click.link"
  }
];
		const DEFAULT_MAPPING = {
			"task.start": "start",
			"task.success": "success",
			"task.failure": "error",
			"task.pending": "notification",
			"click.normal": "press",
			"click.primary": "select",
			"click.toggle": "toggle-on",
			"click.send": "send",
			"click.close": "close",
			"click.danger": "delete",
			"click.link": "open"
		};

		const zh = {
			"settingsNav": "音效",
			"enabled": "启用音效",
			"volume": "音量",
			"pack": "音色包",
			"taskSounds": "任务音",
			"clickSounds": "按钮音",
			"attentionSounds": "提醒音",
			"preview": "试听",
			"reset": "恢复默认",
			"scenario.task.start": "任务开始",
			"scenario.task.success": "任务成功",
			"scenario.task.failure": "任务失败",
			"scenario.task.pending": "待处理提醒",
			"scenario.click.normal": "普通点击",
			"scenario.click.primary": "主要按钮",
			"scenario.click.toggle": "开关",
			"scenario.click.send": "发送",
			"scenario.click.close": "关闭 / 取消",
			"scenario.click.danger": "删除 / 危险",
			"scenario.click.link": "链接"
		};
		const en = {
			"settingsNav": "Sound Effects",
			"enabled": "Enable sounds",
			"volume": "Volume",
			"pack": "Sound pack",
			"taskSounds": "Task sounds",
			"clickSounds": "Button sounds",
			"attentionSounds": "Attention sounds",
			"preview": "Preview",
			"reset": "Reset defaults",
			"scenario.task.start": "Task start",
			"scenario.task.success": "Task success",
			"scenario.task.failure": "Task failure",
			"scenario.task.pending": "Pending attention",
			"scenario.click.normal": "Normal click",
			"scenario.click.primary": "Primary button",
			"scenario.click.toggle": "Toggle / checkbox",
			"scenario.click.send": "Send",
			"scenario.click.close": "Close / cancel",
			"scenario.click.danger": "Delete / danger",
			"scenario.click.link": "Link"
		};

		function normalizePrefs(raw) {
			const source = raw !== null && typeof raw === "object" ? raw : {};
			const mapping = { ...DEFAULT_MAPPING };
			if (source.mapping !== null && typeof source.mapping === "object") {
				for (const [scenario, cue] of Object.entries(source.mapping)) {
					if (typeof cue === "string" && te.includes(cue) && mapping[scenario] !== undefined) mapping[scenario] = cue;
				}
			}
			return {
				enabled: typeof source.enabled === "boolean" ? source.enabled : true,
				volume: typeof source.volume === "number" ? Math.max(0, Math.min(1, source.volume)) : 0.55,
				pack: typeof source.pack === "string" && W.includes(source.pack) ? source.pack : "zen",
				taskSounds: typeof source.taskSounds === "boolean" ? source.taskSounds : true,
				clickSounds: typeof source.clickSounds === "boolean" ? source.clickSounds : true,
				attentionSounds: typeof source.attentionSounds === "boolean" ? source.attentionSounds : true,
				mapping
			};
		}

		/** Pack display label (uisfx metadata). */
		function packLabel(pack) {
			const found = ee.find((entry) => entry.name === pack);
			return found === undefined ? pack : found.label;
		}
		/** Cue display label (uisfx metadata). */
		function cueLabel(cue) {
			const found = $.find((entry) => entry.name === cue);
			return found === undefined ? cue : found.label;
		}

		/** Settings section component (plain React, no JSX build step). */
		function SettingsSection({ service, t }) {
			const react$1 = react;
			const [prefs, setPrefs] = react$1.useState(() => service.getPrefs());
			react$1.useEffect(() => service.subscribe(setPrefs), [service]);
			const create = react$1.createElement;

			const s = {
				root: { display: "flex", flexDirection: "column", gap: 14, padding: "4px 0" },
				row: { display: "flex", alignItems: "center", gap: 10, minHeight: 30 },
				label: { flex: 1, minWidth: 0, fontSize: 13, color: "var(--dsw-alias-label-primary)" },
				control: { flex: "none" },
				select: { boxSizing: "border-box", border: "1px solid var(--dsw-alias-border-l2)", borderRadius: 8, background: "var(--dsw-specific-input-major)", color: "var(--dsw-alias-label-primary)", padding: "5px 8px", fontSize: 13 },
				button: { boxSizing: "border-box", border: "1px solid var(--dsw-alias-border-l2)", borderRadius: 8, background: "var(--dsw-alias-button-floating-fill)", color: "var(--dsw-alias-label-secondary)", cursor: "pointer", padding: "4px 10px", fontSize: 12 },
				switch: { width: 34, height: 20, cursor: "pointer" },
				section: { fontSize: 12, fontWeight: 500, color: "var(--dsw-alias-label-secondary)", marginTop: 6 },
				hint: { fontSize: 12, color: "var(--dsw-alias-label-tertiary)" }
			};

			const scenarioRows = SCENARIO_DEFS.map((entry) => {
				const scenario = entry.id;
				const cue = prefs.mapping[scenario] ?? DEFAULT_MAPPING[scenario];
				return create("div", { key: scenario, style: s.row },
					create("span", { style: s.label }, t("scenario." + scenario)),
					create("select", {
						style: { ...s.select, ...s.control },
						value: cue,
						onChange: (event) => { service.setScenarioCue(scenario, event.target.value); }
					}, te.map((cueId) => create("option", { key: cueId, value: cueId }, cueLabel(cueId)))),
					create("button", { type: "button", style: s.button, onClick: () => { service.preview(cue); } }, t("preview"))
				);
			});

			const resetButton = () => service.reset();

			return create("div", { style: s.root, "data-ui-sound-settings": "" },
				create("div", { style: s.row },
					create("span", { style: s.label }, t("enabled")),
					create("input", { type: "checkbox", style: s.switch, checked: prefs.enabled, onChange: (event) => { service.setEnabled(event.target.checked); } })
				),
				create("div", { style: s.row },
					create("span", { style: s.label }, t("volume") + " " + Math.round(prefs.volume * 100) + "%"),
					create("input", { type: "range", min: 0, max: 100, step: 1, style: { ...s.control, width: 160 }, value: Math.round(prefs.volume * 100), onChange: (event) => { service.setVolume(Number(event.target.value) / 100); } })
				),
				create("div", { style: s.row },
					create("span", { style: s.label }, t("pack")),
					create("select", { style: { ...s.select, ...s.control }, value: prefs.pack, onChange: (event) => { service.setPack(event.target.value); } },
						W.map((pack) => create("option", { key: pack, value: pack }, packLabel(pack))))
				),
				create("div", { style: s.section }, t("taskSounds")),
				create("div", { style: s.row },
					create("span", { style: s.label }, t("scenario.task.start")),
					create("select", { style: { ...s.select, ...s.control }, value: prefs.mapping["task.start"], onChange: (event) => { service.setScenarioCue("task.start", event.target.value); } },
						te.map((cueId) => create("option", { key: cueId, value: cueId }, cueLabel(cueId)))),
					create("button", { type: "button", style: s.button, onClick: () => { service.preview(prefs.mapping["task.start"]); } }, t("preview"))
				),
				create("div", { style: s.row },
					create("span", { style: s.label }, t("scenario.task.success")),
					create("select", { style: { ...s.select, ...s.control }, value: prefs.mapping["task.success"], onChange: (event) => { service.setScenarioCue("task.success", event.target.value); } },
						te.map((cueId) => create("option", { key: cueId, value: cueId }, cueLabel(cueId)))),
					create("button", { type: "button", style: s.button, onClick: () => { service.preview(prefs.mapping["task.success"]); } }, t("preview"))
				),
				create("div", { style: s.row },
					create("span", { style: s.label }, t("scenario.task.failure")),
					create("select", { style: { ...s.select, ...s.control }, value: prefs.mapping["task.failure"], onChange: (event) => { service.setScenarioCue("task.failure", event.target.value); } },
						te.map((cueId) => create("option", { key: cueId, value: cueId }, cueLabel(cueId)))),
					create("button", { type: "button", style: s.button, onClick: () => { service.preview(prefs.mapping["task.failure"]); } }, t("preview"))
				),
				create("div", { style: s.row },
					create("span", { style: s.label }, t("scenario.task.pending")),
					create("select", { style: { ...s.select, ...s.control }, value: prefs.mapping["task.pending"], onChange: (event) => { service.setScenarioCue("task.pending", event.target.value); } },
						te.map((cueId) => create("option", { key: cueId, value: cueId }, cueLabel(cueId)))),
					create("button", { type: "button", style: s.button, onClick: () => { service.preview(prefs.mapping["task.pending"]); } }, t("preview"))
				),
				create("div", { style: s.section }, t("clickSounds")),
				scenarioRows.filter((row) => row.key.startsWith("click.")),
				create("div", { style: s.row },
					create("span", { style: s.label }, t("attentionSounds")),
					create("input", { type: "checkbox", style: s.switch, checked: prefs.attentionSounds, onChange: (event) => { service.setAttentionSounds(event.target.checked); } })
				),
				create("div", { style: s.row },
					create("span", { style: s.label }, t("taskSounds")),
					create("input", { type: "checkbox", style: s.switch, checked: prefs.taskSounds, onChange: (event) => { service.setTaskSounds(event.target.checked); } })
				),
				create("div", { style: s.row },
					create("span", { style: s.label }, t("clickSounds")),
					create("input", { type: "checkbox", style: s.switch, checked: prefs.clickSounds, onChange: (event) => { service.setClickSounds(event.target.checked); } })
				),
				create("div", { style: s.row },
					create("span", { style: s.hint }, "uisfx 0.4.0 — MIT"),
					create("button", { type: "button", style: s.button, onClick: resetButton }, t("reset"))
				)
			);
		}

		function classifyClick(target) {
			if (!(target instanceof Element)) return null;
			const el = target.closest("button, [role='button'], [role='switch'], [role='checkbox'], a, [aria-pressed]");
			if (el === null || el.disabled === true || el.getAttribute("aria-disabled") === "true") return null;
			const label = ((el.getAttribute("aria-label") ?? "") + " " + (el.getAttribute("title") ?? "")).toLowerCase();
			const cls = typeof el.className === "string" ? el.className : "";
			if (label.includes("关闭") || label.includes("close") || label.includes("取消") || label.includes("cancel")) return "click.close";
			if (label.includes("发送") || label.includes("send") || label.includes("submit") || label.includes("go")) return "click.send";
			if (label.includes("删除") || label.includes("delete") || label.includes("清空") || label.includes("clear") || label.includes("trash") || label.includes("移除")) return "click.danger";
			if (el.getAttribute("role") === "switch" || el.getAttribute("role") === "checkbox" || el.hasAttribute("aria-pressed")) return "click.toggle";
			if (el.tagName === "A" || el.getAttribute("role") === "link") return "click.link";
			if (cls.includes("primary") || cls.includes("accent") || cls.includes("send")) return "click.primary";
			return "click.normal";
		}

		function apply(ctx) {
			let prefs = normalizePrefs(null);
			const listeners = new Set();
			let player = null;
			let disposed = false;

			/** Persist one scalar field through the plugin's own settings API. */
			function persistField(field, value) {
				fetch(API_BASE, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({ field, value })
				}).then((res) => res.json()).then((data) => {
					if (!disposed && data !== null && typeof data === "object" && data.ok === true && data.value !== undefined) applyPrefs(data.value);
				}).catch(() => {});
			}
			/** Load durable prefs from the Host on startup. */
			function loadRemotePrefs() {
				fetch(API_BASE, { cache: "no-store" }).then((res) => res.json()).then((data) => {
					if (!disposed && data !== null && typeof data === "object" && data.ok === true && data.value !== undefined) applyPrefs(data.value);
				}).catch(() => {});
			}

			function publish(next) {
				prefs = next;
				for (const listener of [...listeners]) {
					try { listener(next); } catch {}
				}
			}
			function ensurePlayer() {
				if (player !== null) return player;
				player = ie({
					pack: prefs.pack,
					volume: prefs.volume,
					enabled: prefs.enabled,
					preferences: { key: NS + ":local-mirror" }
				});
				window.__dshUISound = () => player;
				return player;
			}
			function applyPrefs(raw) {
				const next = normalizePrefs(raw);
				publish(next);
				if (player !== null) {
					try {
						player.setEnabled(next.enabled);
						player.setVolume(next.volume);
						player.setPack(next.pack);
					} catch {}
				}
			}

			const tBound = ctx.locale.bind(NS);
			const t = (key) => {
				try { return tBound(key); } catch { return zh[key] ?? en[key] ?? key; }
			};

			function playCue(cue) {
				if (!prefs.enabled || typeof cue !== "string" || !te.includes(cue)) return null;
				try { return ensurePlayer().play(cue); } catch { return null; }
			}
			function gate(scenario) {
				if (scenario === "task.pending") return prefs.attentionSounds;
				if (scenario.startsWith("task.")) return prefs.taskSounds;
				if (scenario.startsWith("click.")) return prefs.clickSounds;
				return true;
			}

			const service = {
				getPrefs: () => prefs,
				subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener); },
				play: (scenario) => {
					if (!prefs.enabled || !gate(scenario)) return null;
					const cue = prefs.mapping[scenario];
					return cue === undefined ? null : playCue(cue);
				},
				playCue,
				preview: (cue) => {
					if (prefs.enabled) {
						try { ensurePlayer().play(cue); } catch {}
					}
				},
				setEnabled: (enabled) => {
					const next = { ...prefs, enabled: enabled === true };
					publish(next);
					if (player !== null) try { player.setEnabled(next.enabled); } catch {}
					void persistField("enabled", next.enabled);
				},
				setVolume: (volume) => {
					const value = Math.max(0, Math.min(1, Number(volume) || 0));
					const next = { ...prefs, volume: value };
					publish(next);
					if (player !== null) try { player.setVolume(value); } catch {}
					void persistField("volume", value);
				},
				setPack: (pack) => {
					if (!W.includes(pack)) return;
					const next = { ...prefs, pack };
					publish(next);
					if (player !== null) try { player.setPack(pack); } catch {}
					void persistField("pack", pack);
				},
				setTaskSounds: (enabled) => { publish({ ...prefs, taskSounds: enabled === true }); void persistField("taskSounds", enabled === true); },
				setClickSounds: (enabled) => { publish({ ...prefs, clickSounds: enabled === true }); void persistField("clickSounds", enabled === true); },
				setAttentionSounds: (enabled) => { publish({ ...prefs, attentionSounds: enabled === true }); void persistField("attentionSounds", enabled === true); },
				setScenarioCue: (scenario, cue) => {
					if (!te.includes(cue) || prefs.mapping[scenario] === undefined) return;
					const next = { ...prefs, mapping: { ...prefs.mapping, [scenario]: cue } };
					publish(next);
					void persistField("mapping", next.mapping);
				},
				reset: () => {
					const next = normalizePrefs(null);
					publish(next);
					if (player !== null) try { player.setEnabled(next.enabled); player.setVolume(next.volume); player.setPack(next.pack); } catch {}
					for (const field of ["enabled", "volume", "pack", "taskSounds", "clickSounds", "attentionSounds", "mapping"]) {
						void persistField(field, next[field]);
					}
				}
			};

			window.__dshUISoundDebug = () => {
				return {
					prefs,
					storage: "host-api",
					disposed
				};
			};

			// The service is offered for other plugins; an absent `reflect` must
			// not take the rest of `apply` down with it.
			let disposeService = () => {};
			try { disposeService = ctx.reflect.provide("uiSound", service); } catch {}

			// Locale dictionaries.
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-ui-sound: dictionaries");

			// Load Host-persisted preferences through the plugin settings API.
			loadRemotePrefs();

			// Task lifecycle watcher.
			//
			// Ported to the dsh 0.2.0 Client API. The stock bundle read
			// `ctx.sessions.list.getSnapshot().current`, which 0.2.0 does not
			// publish — the Session list snapshot is exactly
			// `{ ids, byId, phase, projectionsBySession }` — and read a `pending`
			// array that is not a SessionSnapshot field either. Both reads
			// silently produced nothing, so every task sound was dead.
			//
			// What 0.2.0 actually offers:
			//   * the viewed Session is the one the conversation view retains,
			//     i.e. the list row with `retainedBy.mainView > 0`; `ui-session`
			//     and `ui-workspace` derive "current" by the same rule;
			//   * run state is `row.running` on that list row;
			//   * `lastAgentError` on the Session's own snapshot reports failure;
			//   * `uiSession.sessionStatus` is the only source of
			//     `pendingInteraction` (approval / question / plan review).
			let listOff = null;
			let statusOff = null;
			let lastViewedId;
			/** Last observed run state per Session id; absent means "no baseline yet". */
			const runningById = new Map();
			/** Last observed pending-interaction state per Session id. */
			const pendingById = new Map();

			/**
			 * The Session the conversation view currently retains, falling back to
			 * the last one it retained so cues still fire while the user is on
			 * another panel (Settings, Files) instead of going silent.
			 * @returns the Session id, or undefined when none was ever viewed.
			 */
			function viewedSessionId() {
				const list = ctx.sessions.list.getSnapshot();
				for (const id of list.ids) {
					const row = list.byId[id];
					if (row !== undefined && (row.retainedBy?.mainView ?? 0) > 0) {
						lastViewedId = id;
						return id;
					}
				}
				return lastViewedId;
			}

			/**
			 * One Session's own snapshot, when its generation is live in this Client.
			 * @param id - Session identity.
			 * @returns the snapshot, or undefined when the Session is not retained.
			 */
			function sessionSnapshot(id) {
				const binding = ctx.sessions.binding(id);
				return binding === undefined ? undefined : binding.session.getSnapshot();
			}

			/**
			 * Whether the Turn that just ended failed. `lastAgentError` is the
			 * authoritative signal; the rendered terminal row is the fallback for
			 * the Session currently on screen.
			 * @param id - Session identity.
			 * @param snapshot - that Session's snapshot captured at the edge.
			 * @returns true when the Turn ended in failure.
			 */
			function outcomeFailed(id, snapshot) {
				if (snapshot !== undefined && snapshot.lastAgentError !== null && snapshot.lastAgentError !== undefined) return true;
				const list = ctx.sessions.list.getSnapshot();
				const row = list.byId[id];
				if (row === undefined || (row.retainedBy?.mainView ?? 0) === 0) return false;
				return document.querySelector("[data-chat-flow-kind='turn-error']") !== null;
			}

			/** Edge-detect run state across the Session list and cue the viewed Session. */
			function onListChanged() {
				const list = ctx.sessions.list.getSnapshot();
				const viewed = viewedSessionId();
				for (const id of list.ids) {
					const row = list.byId[id];
					if (row === undefined) continue;
					const running = row.running === true;
					const previous = runningById.get(id);
					if (previous === undefined) {
						// First sighting only records a baseline: a Session already
						// running when the page loads must not fire "start".
						runningById.set(id, running);
						continue;
					}
					if (running === previous) continue;
					runningById.set(id, running);
					if (id !== viewed) continue;
					if (running) {
						service.play("task.start");
						continue;
					}
					const atEdge = sessionSnapshot(id);
					window.setTimeout(() => {
						service.play(outcomeFailed(id, atEdge) ? "task.failure" : "task.success");
					}, 50);
				}
			}

			/** Edge-detect pending interactions; an attention cue is for any Session. */
			function onStatusChanged() {
				const ui = ctx.get("uiSession");
				if (ui === undefined || ui.sessionStatus === undefined) return;
				const snapshot = ui.sessionStatus.getSnapshot();
				if (!(snapshot instanceof Map)) return;
				for (const [id, status] of snapshot) {
					const pending = status !== undefined && status !== null && status.pendingInteraction !== undefined && status.pendingInteraction !== null;
					const previous = pendingById.get(id) ?? false;
					if (pending === previous) continue;
					pendingById.set(id, pending);
					if (pending) service.play("task.pending");
				}
			}

			listOff = ctx.sessions.list.subscribe(onListChanged);
			onListChanged();
			const uiSession = ctx.get("uiSession");
			if (uiSession !== undefined && uiSession.sessionStatus !== undefined) {
				statusOff = uiSession.sessionStatus.subscribe(onStatusChanged);
				onStatusChanged();
			}

			// Button feedback watcher: pointer activation here, keyboard activation
			// through the synthesized click a control dispatches for Enter/Space.
			// Controls inside this plugin's own settings page are excluded, so
			// changing a setting never doubles the preview the page already plays.
			let lastClickAt = 0;
			/**
			 * Classify one activation and play its cue.
			 * @param target - the event target.
			 */
			function playClickScenario(target) {
				if (!prefs.enabled || !prefs.clickSounds) return;
				const element = target instanceof Element ? target : null;
				if (element !== null && element.closest("[data-ui-sound-settings]") !== null) return;
				const scenario = classifyClick(target);
				if (scenario === null) return;
				const now = Date.now();
				if (now - lastClickAt < 40) return;
				lastClickAt = now;
				service.play(scenario);
			}
			const onPointerDown = (event) => {
				if (!prefs.enabled) return;
				// Prime the AudioContext on the first gesture: browsers refuse to
				// start one outside a user activation, and a swallowed first cue is
				// the most common "the plugin is broken" report.
				try { const ui = ensurePlayer(); void ui.unlock(); } catch {}
				playClickScenario(event.target);
			};
			/**
			 * Keyboard activation. Enter/Space on a focused control dispatches a
			 * click with `detail === 0`; a mouse click reports a click count, so
			 * this never doubles the pointerdown cue.
			 * @param event - the click event.
			 */
			const onKeyboardActivation = (event) => {
				if (event.detail !== 0) return;
				playClickScenario(event.target);
			};
			document.addEventListener("pointerdown", onPointerDown, true);
			document.addEventListener("click", onKeyboardActivation, true);

			// Settings section registration.
			let disposeSettingsSection = null;
			try {
				disposeSettingsSection = ctx.slots.inject("settings.section", () => ctx.slots.register({
					name: "settings.section",
					id: "ui-sound",
					order: 110,
					label: () => t("settingsNav"),
					inject: () => ({ service, t })
				}, SettingsSection));
			} catch {}

			return () => {
				disposed = true;
				if (listOff !== null) try { listOff(); } catch {}
				if (statusOff !== null) try { statusOff(); } catch {}
				if (typeof disposeSettingsSection === "function") try { disposeSettingsSection(); } catch {}
				document.removeEventListener("pointerdown", onPointerDown, true);
				document.removeEventListener("click", onKeyboardActivation, true);
				try { disposeService(); } catch {}
			};
		}

		exports.apply = apply;
		// `uiSession` is read through `ctx.get()` rather than injected: it only
		// carries the optional pending-interaction cue, and a hard dependency on
		// it would take the whole plugin down on a Host that does not mount it.
		exports.inject = ["slots", "sessions", "locale"];
		return module.exports;
	}
});
