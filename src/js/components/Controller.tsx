import { FC, useState } from 'react';
import FishEditor from './fishEditor/FishEditor';
import FishExecutorView from './executor/FishExecutorView';

enum Activity {
	Editing,
	Executing
}

const Controller: FC = () => {
	const [activity, setActivity] = useState<Activity>(Activity.Editing);

	const changeActivity = (newActivity: Activity) => setActivity(newActivity);

	if (activity === Activity.Editing) {
		return (
			<FishEditor
				execute={() => changeActivity(Activity.Executing)}
			/>
		);
	}

	return (
		<FishExecutorView
			source={localStorage.code}
			edit={() => changeActivity(Activity.Editing)}
		/>
	);
};

export default Controller;
