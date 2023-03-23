```c

#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <assert.h>

struct task {
    int n;
};

void task_destroy(struct task* task) {

}

/*default size, if you leave capacity == 0*/
#define DEFAULT_QUEUE_SIZE 3

struct queue
{
    struct task* tasks;
    int          capacity; /*maximum size*/
    int          count;    /*number of items*/
    struct task* back;     /*position next insertion*/
    struct task* front;    /*oldest*/
};


int queue_push_back(struct queue* queue, int n)
{
    if (queue->tasks == NULL)
    {
        int capacity = queue->capacity > 0 ? queue->capacity : DEFAULT_QUEUE_SIZE;

        queue->tasks = calloc(capacity, sizeof(struct task));

        if (queue->tasks == NULL)
           return ENOMEM;

        queue->capacity = capacity;
        queue->back = queue->tasks;
        queue->front = queue->tasks;            
    }

    if (queue->count == queue->capacity) {
        return ERANGE; /*queue is full*/
    }

    queue->back->n = n;
    queue->back++;

    if (queue->back == (queue->tasks + queue->capacity)) {
        queue->back = queue->tasks;
    }
    queue->count++;
   
    return 0;
}


int queue_pop(struct queue* queue)
{
    //pre condition
    assert(queue->count > 0);

    struct task* ptask = queue->front;
    queue->front++;
    if (queue->front == (queue->tasks + queue->capacity)) {
        queue->front = queue->tasks;
    }
    queue->count--;
    return ptask->n;
}


void queue_destroy(struct queue* queue)
{
    while (queue->count > 0) {
        task_destroy(queue->front);
        queue_pop(queue);
    }

    free(queue->tasks);
}

/*<- front, .... back */
void print(const struct queue* queue) {
    
    struct task* it = queue->front;    
    for (int i = 0; i < queue->count; i++) {   
        printf("%d ", it->n);
        it++;
        if (it == (queue->tasks + queue->capacity)) {
            it = queue->tasks;
        }        
    }    
    printf("\n");
}

int main()
{
    struct queue queue = { .capacity = 3 };

    for (int i = 0; i < 10; i++) {
        queue_push_back(&queue, i);
        print(&queue);
    }
    
    queue_destroy(&queue);
}


```

