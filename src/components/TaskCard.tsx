type TaskCardProps = {
    taks: {
        id: number;
        title: string | number;
        days: number;
        isDone: boolean;
    };

    onDelete: (id: number) => void;
};

export default function TaskCard({task, onDelete}: TaskCardProps) {

}