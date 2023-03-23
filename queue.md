# Queue

## Sample 1 - Queue with fixed size, remove oldest element

```c
struct task {
    int n;
};
void task_destroy(struct task* task) {}

struct queue {
    struct task* tasks;
    int          capacity; /*maximum size*/
    int          count;    /*number of items*/
    struct task* back;     /*position next insertion*/
    struct task* front;    /*oldest*/
};
```

## Sample 2 - Queue with fixed size, don´t add if full

```c
struct task {
    int n;
};
void task_destroy(struct task* task) {}

struct queue {
    struct task* tasks;
    int          capacity; /*maximum size*/
    int          count;    /*number of items*/
    struct task* back;     /*position next insertion*/
    struct task* front;    /*oldest*/
};
```


