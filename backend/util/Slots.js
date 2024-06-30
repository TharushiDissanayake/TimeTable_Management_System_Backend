const calculateSlotsDuringTime = (startTime, endTime, slotInterval) => {
    var startParts = startTime.split(".");
    var endParts = endTime.split(".");
  
    var startHour = parseInt(startParts[0]);
    var startMinute = parseInt(startParts[1]);
    var endHour = parseInt(endParts[0]);
    var endMinute = parseInt(endParts[1]);
  
    var startMinutes = startHour * 60 + startMinute;
    var endMinutes = endHour * 60 + endMinute;
  
    // Calculate the slot number for start time
    var startSlotNumber = Math.floor(startMinutes / slotInterval) + 1;
  
    // Calculate the slot number for end time
    var endSlotNumber = Math.floor(endMinutes / slotInterval) + 1;
  
    // Calculate the slot numbers within the specified time range
    var slots = [];
    for (var i = startSlotNumber; i < endSlotNumber; i++) {
      slots.push(i);
    }
  
    return slots;
  };
  
  module.exports = calculateSlotsDuringTime;