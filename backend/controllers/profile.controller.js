import { Profile } from '../models/profile.model.js';
import mongoose from 'mongoose';

const getProfiles = async (req, res) => {

    try {
        
        const profiles = await Profile.find({}).sort({ createdAt: -1 });
        
        res.json(profiles);

    }catch (error){

        res.status(500).json({ message: 'Server error', error });

  }

}

const getProfileId = async (req, res) => {

  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) {

    return res.status(400).json({ message: 'Invalid ID' });

  }

  try {

    const profile = await Profile.findById(id);
    
    if (!profile) {

        return res.status(404).json({ message: 'Profile not found' });

    }
    
    res.json(profile);

    }catch (error) {

    res.status(500).json({ message: 'Server error', error });

  }

}

const idUnlocked = async (req, res) => {

  const { id } = req.params;

  const { unlockedBy } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)){

    return res.status(400).json({ message: 'Invalid ID' });

  }
    
  try {

    const profile = await Profile.findById(id);

    if (!profile) {

        return res.status(404).json({ message: 'Profile not found' });

    }

    if (profile.unlocked) {

      return res.json({ message: 'Profile already unlocked', profile });

    }

    profile.unlocked = true;

    profile.unlockedAt = new Date().toLocaleDateString('en-GB');

    if (unlockedBy) {

        profile.unlockedBy = unlockedBy;

    }

    await profile.save();

    res.json({ message: 'Profile unlocked', profile });

  } catch (error) {

    res.status(500).json({ message: 'Server error', error });
    
  }
}

export {
    getProfiles,
    getProfileId,
    idUnlocked
}